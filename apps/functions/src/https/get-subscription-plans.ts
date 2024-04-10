import admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { dbCollections } from "../utils/db";
import { stripe } from "../utils/stripe";
import { Timestamp } from "firebase-admin/firestore";

exports.getSubscriptionPlans = onRequest(
  { cors: true },
  async (_, response) => {
    const querySnapshot = await admin
      .firestore()
      .collection(dbCollections.subscriptionPlans)
      .get();
    const result = querySnapshot.docs.map((d) => d.data());
    let plans = [];
    for (const i of result) {
      const product = await stripe.products.retrieve(i.stripeProductId);
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
      });
      const monthPrice =
        prices.data.find((p) => p.recurring?.interval === "month")
          ?.unit_amount || 0;
      const yearPrice =
        prices.data.find((p) => p.recurring?.interval === "year")
          ?.unit_amount || 0;
      plans.push({
        id: i.id,
        name: product.name,
        pricing: {
          month: Number((monthPrice / 100).toFixed(2)) || 0,
          year: Number((yearPrice / 100).toFixed(2)) || 0,
        },
        createdAt: new Timestamp(i.createdAt.seconds, i.createdAt.nanoseconds),
        updatedAt: new Timestamp(i.updatedAt.seconds, i.updatedAt.nanoseconds),
      });
    }
    response.json({
      status: "ok",
      data: plans,
    });
  }
);
