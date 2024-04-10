import admin from "firebase-admin";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import joi from "joi";
import { DEFAULT_CURRENCY, stripe } from "../utils/stripe";
import { dbCollections } from "../utils/db";
import { FieldValue } from "firebase-admin/firestore";

export async function createRecurringPrice(
  productId: string,
  data: { price: number; interval: "month" | "year" }
) {
  const { price, interval } = data;
  const newPrice = await stripe.prices.create({
    currency: DEFAULT_CURRENCY,
    unit_amount: price * 100,
    recurring: {
      interval: interval,
    },
    product: productId,
  });
  return newPrice;
}

exports.createPricing = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      "failed-precondition",
      "The function must be " + "called while authenticated."
    );
  }
  const body = request.data;
  const schema = joi.object({
    subscriptionId: joi.string().required(),
    price: joi.number().required(),
    interval: joi.string().valid("month", "year"),
  });
  const validate = schema.validate(body);
  if (validate.error) {
    throw new HttpsError("invalid-argument", validate.error.message);
  }
  const result = (
    await admin
      .firestore()
      .collection(dbCollections.subscriptionPlans)
      .doc(body.subscriptionId)
      .get()
  ).data();
  if (!result) return;
  const productId = result.stripeProductId;
  await createRecurringPrice(productId, {
    price: body.price,
    interval: body.interval,
  });
  await admin
    .firestore()
    .collection(dbCollections.subscriptionPlans)
    .doc(body.subscriptionId)
    .update({
      updatedAt: FieldValue.serverTimestamp(),
    });
  return {
    status: "ok",
    message: `${result.type}_${body.interval} recurring pricing created`,
  };
});
