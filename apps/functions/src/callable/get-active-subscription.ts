import { onCall, HttpsError } from "firebase-functions/v2/https";
import joi from "joi";
import { stripe } from "../utils/stripe";

exports.getActiveSubscription = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      "failed-precondition",
      "The function must be " + "called while authenticated."
    );
  }
  const body = request.data;
  const schema = joi.object({
    customerId: joi.string().required(),
  });
  const validate = schema.validate(body);
  if (validate.error) {
    throw new HttpsError("invalid-argument", validate.error.message);
  }
  try {
    const customerId = body.customerId;
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
    });
    if (subscriptions.data.length === 0) {
      return { status: "ok", data: null, message: "No subscriptions found" };
    }
    let subscription = subscriptions.data[0];
    const subItem = subscription.items.data[0];
    const stripeProduct = await stripe.products.retrieve(
      subItem.plan.product as string
    );
    return {
      status: "ok",
      data: {
        id: subscription.id,
        currentPeriodStart: new Date(
          subscription.current_period_start * 1000
        ).toISOString(),
        currentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ).toISOString(),
        status: subscription.status,
        customerId: subscription.customer,
        startDate: new Date(subscription.start_date * 1000).toISOString(),
        endedAt: subscription.ended_at
          ? new Date(subscription.ended_at * 1000).toISOString()
          : null,
        canceledAt: subscription.canceled_at
          ? new Date(subscription.canceled_at * 1000).toISOString()
          : null,
        cancelAt: subscription.cancel_at
          ? new Date(subscription.cancel_at * 1000).toISOString()
          : null,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        plan: {
          name: stripeProduct.name,
          amount: subItem.plan.amount,
          currency: subItem.plan.currency,
          interval: subItem.plan.interval,
        },
        createdAt: new Date(subscription.created * 1000).toISOString(),
      },
      message: "success",
    };
  } catch (err) {
    return {
      status: "failed",
      data: null,
      message: err,
    };
  }
});
