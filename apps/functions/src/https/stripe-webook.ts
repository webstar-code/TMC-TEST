import admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { stripe } from "../utils/stripe";

const STRIPE_WEBHOOK_SECRET =
  "whsec_3a55633c2f9b0ffae53055e11d1d4e5bf382764b41c378dda4f5ddbc7079b6b3";

exports.stripeWebhook = onRequest({ cors: true }, async (req, res) => {
  try {
    if (!STRIPE_WEBHOOK_SECRET) {
      throw new Error("stripe env variables are not set up");
    }
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      req.headers["stripe-signature"]!,
      STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case "customer.subscription.deleted":
        // Then define and call a function to handle the event customer.subscription.deleted
        break;
      case "customer.subscription.paused":
        // Then define and call a function to handle the event customer.subscription.paused
        break;
      case "customer.subscription.resumed":
        // Then define and call a function to handle the event customer.subscription.resumed
        break;
      case "customer.subscription.updated":
        const customerSubscriptionUpdated = event.data.object;
        const customer = await stripe.customers.retrieve(
          customerSubscriptionUpdated.customer as string
        );
        // @ts-ignore
        const vendorId = customer.metadata.firestore_id;
        admin
          .firestore()
          .collection("vendors")
          .doc(vendorId)
          .update({
            susbcriptionStatus: customerSubscriptionUpdated.status,
            isSubscriptionActive:
              customerSubscriptionUpdated.status === "active" ? true : false,
          });
        break;
      case "invoice.paid":
        const invoicePaid = event.data.object;
        const querySnapshot = await admin
          .firestore()
          .collection("invoices")
          .where("stripeInvoiceId", "==", invoicePaid.id)
          .get();
        if (querySnapshot.docs.length > 0) {
          const invoice = querySnapshot.docs[0].data();
          admin.firestore().collection("invoices").doc(invoice.id).update({
            status: invoicePaid.status,
            amountPaid: invoicePaid.amount_paid,
            paid: invoicePaid.paid,
            receiptNumber: invoicePaid.receipt_number,
          });
        }
        // Then define and call a function to handle the event invoice.paid
        break;
      case "invoice.payment_failed": {
        // send email
        // change db invoice status
        break;
      }
      default:
        console.error(
          "Incoming stripe event, that should not be received",
          event.type
        );
        break;
    }
    res.sendStatus(200);
  } catch (e) {
    const err = e as Error;
    console.error(err);
    res.sendStatus(400);
  } finally {
    res.sendStatus(500);
  }
});
