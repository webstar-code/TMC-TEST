import admin from "firebase-admin";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import joi from "joi";
import { dbCollections } from "../../utils/db";
import { stripe } from "../../utils/stripe";

type CreateProduct = {
  name: string;
};

async function createProduct(data: CreateProduct) {
  const { name } = data;
  const product = await stripe.products.create({
    name,
    type: "service",
  });
  return product;
}

exports.createSubscriptionPlan = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      "failed-precondition",
      "The function must be " + "called while authenticated."
    );
  }
  const body = request.data;
  const schema = joi.object<CreateProduct>({
    name: joi.string().required(),
  });
  const validate = schema.validate(body);
  if (validate.error) {
    throw new HttpsError("invalid-argument", validate.error.message);
  }
  try {
    const product = await createProduct(body);
    const newSubscriptionPlan = {
      id: product.id,
      name: product.name,
      active: product.active,
      items: [],
      features: product.features,
      pricing: null,
      createdAt: new Date(product.created * 1000),
      updatedAt: new Date(product.updated * 1000),
    };
    admin
      .firestore()
      .collection(dbCollections.subscriptionPlans)
      .doc(product.id)
      .set(newSubscriptionPlan);
    return { status: "ok", data: newSubscriptionPlan };
  } catch (err) {
    throw new HttpsError("internal", "something went wrong.");
  }
});
