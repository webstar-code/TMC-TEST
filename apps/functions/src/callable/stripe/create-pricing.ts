import admin from "firebase-admin";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import joi from "joi";
import { dbCollections } from "../../utils/db";
import { DEFAULT_CURRENCY, stripe } from "../../utils/stripe";

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
  const productId = body.subscriptionPlanId;
  const newPrice = await createRecurringPrice(productId, {
    price: body.price,
    interval: body.interval,
  });

  await admin
    .firestore()
    .collection(dbCollections.subscriptionPlans)
    .doc(productId)
    .update({
      [`pricing.${body.interval}`]: newPrice.unit_amount,
    });
  return {
    status: "ok",
    message: `${body.interval} recurring pricing created`,
  };
});
