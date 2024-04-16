import { HttpsError, onCall } from "firebase-functions/v2/https";
import joi from "joi";
import { stripe } from "../../utils/stripe";
import admin from "firebase-admin";

exports.updateSubscription = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      "failed-precondition",
      "The function must be " + "called while authenticated."
    );
  }
  const body = request.data;
  const schema = joi.object({
    subscriptionId: joi.string().required(),
    recurring: joi.string().required(),
  });
  const validate = schema.validate(body);
  if (validate.error) {
    throw new HttpsError("invalid-argument", validate.error.message);
  }
  const { subscriptionId, recurring } = body;
  const querySnapshot = await admin
    .firestore()
    .collection("subscriptions")
    .doc(subscriptionId)
    .get();
  const subDoc = querySnapshot.data();
  if (!subDoc) return { message: "can't find document" };

  const product = await stripe.products.retrieve(subDoc.subscriptionPlanId);
  const prices = await stripe.prices.list({
    product: product.id,
    active: true,
  });
  const recurringPrice = prices.data.find(
    (p) => p.recurring?.interval === recurring
  );

  const stripeSub = await stripe.subscriptions.retrieve(subscriptionId);
  const subItem = stripeSub.items.data[0];

  const updatedSubscription = await stripe.subscriptions.update(
    subscriptionId,
    {
      items: [
        {
          id: subItem.id,
          price: recurringPrice?.id,
        },
      ],
    }
  );

  return {
    status: "ok",
    data: null,
    message: updatedSubscription.id + "subscription updated",
  };
});
