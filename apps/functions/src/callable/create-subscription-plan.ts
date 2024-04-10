import admin from "firebase-admin";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import joi from "joi";
import { stripe } from "../utils/stripe";
import { dbCollections, generateId } from "../utils/db";

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
    const subId = generateId("sub");
    const newSubscriptionPlan = {
      id: subId,
      stripeProductId: product.id,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    admin
      .firestore()
      .collection(dbCollections.subscriptionPlans)
      .doc(subId)
      .set(newSubscriptionPlan);
    return newSubscriptionPlan;
  } catch (err) {
    throw new HttpsError("internal", "something went wrong.");
  }
});
