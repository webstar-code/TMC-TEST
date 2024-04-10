import { onCall, HttpsError } from "firebase-functions/v2/https";
import joi from "joi";
import { stripe } from "../utils/stripe";
import admin from "firebase-admin";

exports.getActiveSubscription = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      "failed-precondition",
      "The function must be " + "called while authenticated."
    );
  }
  const body = request.data;
  const schema = joi.object({
    userId: joi.string().required(),
  });
  const validate = schema.validate(body);
  if (validate.error) {
    throw new HttpsError("invalid-argument", validate.error.message);
  }

  const userId = body.userId;
  const q = admin
    .firestore()
    .collection("subscriptions")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc");
  const querySnapshot = await q.get();
  if (querySnapshot.docs.length === 0)
    return { status: "ok", data: null, message: "no subscription found" };
  const subscription = querySnapshot.docs[0].data();
  const stripeSub = await stripe.subscriptions.retrieve(
    subscription.stripeSubscriptionId
  );
  const subItem = stripeSub.items.data[0];
  const stripeProduct = await stripe.products.retrieve(
    subItem.plan.product as string
  );

  return {
    status: "ok",
    data: {
      id: subscription.id,
      currentPeriodStart: stripeSub.current_period_start,
      currentPeriodEnd: stripeSub.current_period_end,
      planId: subscription.planId,
      status: stripeSub.status,
      plan: {
        name: stripeProduct.name,
        amount: subItem.plan.amount
          ? Number((subItem.plan.amount / 100).toFixed(2))
          : 0,
        currency: subItem.plan.currency,
        interval: subItem.plan.interval,
      },
    },
    message: "success",
  };
});
