import admin from "firebase-admin";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import joi from "joi";
import { createRecurringPrice } from "./create-pricing";
import { dbCollections } from "../utils/db";
import { stripe } from "../utils/stripe";
import { FieldValue } from "firebase-admin/firestore";

exports.updatePricing = onCall(async (request) => {
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
  const prices = await stripe.prices.list({
    product: productId,
    active: true,
  });
  const priceToDeactivate = prices.data.find(
    (p) => p.recurring?.interval === body.interval && p.active === true
  );
  if (priceToDeactivate) {
    await stripe.prices.update(priceToDeactivate.id, { active: false });
  }
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
