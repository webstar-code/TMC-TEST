import admin from "firebase-admin";
import { generateId } from "../utils/db";
import { stripe } from "../utils/stripe";
import { onCall } from "firebase-functions/v2/https";

exports.purchaseSubscription = onCall(async (request) => {
  try {
    const {
      userId,
      name,
      email,
      phoneNumber,
      subscriptionPlanId,
      recurring,
      paymentMethodId,
    } = request.data;
    const customers = await stripe.customers.search({
      query: `metadata[\'firestore_id\']:\'${userId}\'`,
    });
    let customer;
    if (customers.data.length > 0) {
      customer = customers.data[0];
      try {
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: customer.id,
        });
      } catch (err: any) {
        return {
          status: "failed",
          message: {
            code: err.raw.code,
            declineCode: err.raw.decline_code,
            description: err.raw.code,
          },
        };
      }
      customer = await stripe.customers.update(customer.id, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    } else {
      customer = await stripe.customers.create({
        name,
        email,
        phone: phoneNumber,
        metadata: {
          firestore_id: userId,
        },
      });
      try {
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: customer.id,
        });
        customer = await stripe.customers.update(customer.id, {
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });
      } catch (err: any) {
        return {
          status: "failed",
          message: {
            code: err.raw.code,
            declineCode: err.raw.decline_code,
            description: err.raw.code,
          },
        };
      }
    }

    const querySnapshot = await admin
      .firestore()
      .collection("subscription-plans")
      .doc(subscriptionPlanId)
      .get();
    const subDoc = querySnapshot.data();
    if (!subDoc) return { message: "can't find document" };
    const product = await stripe.products.retrieve(subDoc.stripeProductId);
    const prices = await stripe.prices.list({
      product: product.id,
      active: true,
    });
    const recurringPrice = prices.data.find(
      (p) => p.recurring?.interval === recurring
    );

    // // TODO: get taxrate based on user demographics
    // const taxRates = await stripe.taxRates.list({ active: true, limit: 1 });
    // const vat = taxRates.data[0];

    // Create new subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      // default_tax_rates: [vat.id],
      items: [
        {
          price: recurringPrice?.id,
        },
      ],
      payment_behavior: "default_incomplete",
      collection_method: "charge_automatically",
    });
    try {
      await stripe.invoices.pay(subscription.latest_invoice as string);
    } catch (err: any) {
      stripe.subscriptions.cancel(subscription.id, {
        cancellation_details: {
          comment: "Invoice payment failed while subscription creation",
        },
      });
      return {
        status: "failed",
        message: {
          code: err.raw.code,
          declineCode: err.raw.decline_code,
          description: err.raw.code,
        },
      };
    }
    const invoice = await stripe.invoices.retrieve(
      subscription.latest_invoice as string
    );
    const items = invoice.lines.data.map((l) => ({
      amount: l.amount / 100,
      description: l.description,
      currency: l.currency,
    }));

    // write to db
    const id = generateId("sub");
    admin
      .firestore()
      .collection("subscriptions")
      .doc(id)
      .set({
        id,
        planId: subscriptionPlanId,
        stripeSubscriptionId: subscription.id,
        userId: userId,
        createdAt: new Date(subscription.created * 1000),
      });
    const invoiceId = generateId("in");
    const firebaseInvoice = {
      id: invoiceId,
      subscriptionId: subscription.id,
      stripeInvoiceId: invoice.id,
      amountPaid: invoice.amount_paid,
      currency: invoice.currency,
      customerEmail: invoice.customer_email,
      customerName: invoice.customer_name,
      customerPhoneNumber: invoice.customer_phone,
      customerAddress: invoice.customer_address,
      description: invoice.description,
      dueDate: invoice.due_date,
      effectiveDate: invoice.effective_at,
      paid: invoice.paid,
      number: invoice.number,
      periodStart: invoice.period_start,
      periodEnd: invoice.period_end,
      receiptNumber: invoice.receipt_number,
      status: invoice.status,
      subTotal: invoice.subtotal / 100,
      tax: invoice.tax ? invoice.tax / 100 : 0,
      total: invoice.total / 100,
      items,
      invoicePdf: invoice.invoice_pdf,
      created: invoice.created,
    };
    await admin
      .firestore()
      .collection("invoices")
      .doc(invoiceId)
      .set({
        ...firebaseInvoice,
      });
    return {
      status: "ok",
      message: "new subscription created",
    };
  } catch (err) {
    console.error(err);
    return { message: "can't find document" };
  }
});
