import { HttpsError, onCall } from "firebase-functions/v2/https";
import joi from "joi";
import { stripe } from "../../utils/stripe";

exports.cancelSubscription = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      "failed-precondition",
      "The function must be " + "called while authenticated."
    );
  }
  const body = request.data;
  const schema = joi.object({
    subscriptionId: joi.string().required(),
  });
  const validate = schema.validate(body);
  if (validate.error) {
    throw new HttpsError("invalid-argument", validate.error.message);
  }
  const { subscriptionId } = body;

  await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });

  return {
    status: "ok",
    data: null,
    message: "payment paused for " + subscriptionId,
  };
});
