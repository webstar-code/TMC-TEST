import admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { stripe } from "../utils/stripe";

const STRIPE_WEBHOOK_SECRET = "whsec_O5V05CsoRtn9uNEPVMsfHVzT4SGVz32K";

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
        const customerSubscriptionDeleted = event.data.object;
        const c = await stripe.customers.retrieve(
          customerSubscriptionDeleted.customer as string
        );
        // @ts-ignore
        const userId1 = c.metadata.firestore_id;
        admin
          .firestore()
          .collection("users")
          .doc(userId1)
          .update({
            susbcriptionStatus: customerSubscriptionDeleted.status,
            isSubscriptionActive:
              customerSubscriptionDeleted.status === "active" ? true : false,
          });
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
        const userId = customer.metadata.firestore_id;
        admin
          .firestore()
          .collection("users")
          .doc(userId)
          .update({
            susbcriptionStatus: customerSubscriptionUpdated.status,
            isSubscriptionActive:
              customerSubscriptionUpdated.status === "active" ? true : false,
          });
        break;
      case "invoice.finalized":
        const inv = event.data.object;
        await admin
          .firestore()
          .collection("invoices")
          .doc(inv.id)
          .set({
            id: inv.id,
            currency: inv.currency,
            amountPaid: inv.amount_paid,
            customerEmail: inv.customer_email,
            customerName: inv.customer_name,
            customerPhoneNumber: inv.customer_phone,
            items: inv.lines,
            invoiceUrl: inv.invoice_pdf,
            number: inv.number,
            receiptNumber: inv.receipt_number,
            total: inv.total,
            subTotal: inv.subtotal,
            tax: inv.tax,
            subscriptionId: inv.subscription,
            status: inv.status,
            periodEnd: inv.period_end,
            periodStart: inv.period_start,
            createdAt: new Date(inv.created * 1000),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        break;
      case "invoice.paid":
        const invoicePaid = event.data.object;
        await admin
          .firestore()
          .collection("invoices")
          .doc(invoicePaid.id)
          .update({
            status: invoicePaid.status,
          });
        break;
      case "invoice.payment_failed": {
        const invoicePaymentFailed = event.data.object;
        await admin
          .firestore()
          .collection("invoices")
          .doc(invoicePaymentFailed.id)
          .update({
            status: invoicePaymentFailed.status,
          });
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
