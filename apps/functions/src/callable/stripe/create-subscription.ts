import { HttpsError, onCall } from "firebase-functions/v2/https";
import joi from "joi";
import { stripe } from "../../utils/stripe";
import admin from "firebase-admin";

exports.createSubscription = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      "failed-precondition",
      "The function must be " + "called while authenticated."
    );
  }
  const schema = joi.object({
    subscriptionPlanId: joi.string().required(),
    userId: joi.string().required(),
    interval: joi.string().valid("month", "year"),
  });
  const validate = schema.validate(request.data);
  if (validate.error) {
    throw new HttpsError("invalid-argument", validate.error.message);
  }
  const { subscriptionPlanId, userId, interval } = request.data;
  const product = await stripe.products.retrieve(subscriptionPlanId);
  const prices = await stripe.prices.list({
    product: product.id,
    active: true,
  });
  const recurringPrice = prices.data.find(
    (p) => p.recurring?.interval === interval
  );
  const user = (
    await admin.firestore().collection("users").doc(userId).get()
  ).data();
  if (!user) return { status: "failed", message: "Cannot find user" };
  try {
    const subscription = await stripe.subscriptions.create({
      customer: user.customerId,
      items: [{ price: recurringPrice?.id }],
      payment_behavior: "default_incomplete",
      collection_method: "charge_automatically",
    });

    await admin
      .firestore()
      .collection("subscriptions")
      .doc(subscription.id)
      .set({
        id: subscription.id,
        userId,
        subscriptionPlanId,
        customerId: subscription.customer,
      });
    await stripe.invoices.pay(subscription.latest_invoice as string);
    return {
      status: "ok",
      data: subscription,
    };
  } catch (err) {
    return { status: "failed", message: err };
  }
});
