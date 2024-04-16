import admin from "firebase-admin";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import joi from "joi";
import { dbCollections } from "../../utils/db";
import { stripe } from "../../utils/stripe";
import { createRecurringPrice } from "./create-pricing";
import Stripe from "stripe";

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
  const productId = body.subscriptionPlanId;
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

  let activeSubscriptions: Stripe.Subscription[] = [];
  let stripeSubscriptions = await stripe.subscriptions.list();
  activeSubscriptions = [...stripeSubscriptions.data];
  while (stripeSubscriptions.has_more) {
    stripeSubscriptions = await stripe.subscriptions.list();
    activeSubscriptions = [...stripeSubscriptions.data];
  }
  for (const subscription of activeSubscriptions) {
    const subItem = subscription.items.data[0];
    await stripe.subscriptions.update(subscription.id, {
      items: [
        {
          id: subItem.id,
          price: newPrice.id,
        },
      ],
      proration_behavior: "none",
    });
  }

  return {
    status: "ok",
    message: `${body.interval} recurring pricing created`,
  };
});
