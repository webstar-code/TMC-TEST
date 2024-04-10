import Stripe from "stripe";

const STRIPE_KEY = process.env.STRIPE_TEST_KEY;

export const stripe = new Stripe(STRIPE_KEY!, {
  apiVersion: "2023-10-16",
});

export const DEFAULT_CURRENCY = "usd";
