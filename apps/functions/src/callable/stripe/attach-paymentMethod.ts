import admin from "firebase-admin";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import joi from "joi";
import { stripe } from "../../utils/stripe";

exports.attachPaymentMethod = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      "failed-precondition",
      "The function must be " + "called while authenticated."
    );
  }
  const schema = joi.object({
    userId: joi.string().required(),
    customerId: joi.string().optional(),
    name: joi.string().required(),
    email: joi.string().required(),
    phoneNumber: joi.string().required(),
    paymentMethodId: joi.string().required(),
  });
  const validate = schema.validate(request.data);
  if (validate.error) {
    throw new HttpsError("invalid-argument", validate.error.message);
  }

  const { userId, customerId, name, email, phoneNumber, paymentMethodId } =
    request.data;

  let customer;
  if (customerId) {
    customer = await stripe.customers.retrieve(customerId);
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
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
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });
    await admin.firestore().collection("users").doc(userId).update({
      customerId: customer.id,
    });
  }
  customer = await stripe.customers.update(customer.id, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });
  return {
    status: "ok",
    data: customer,
  };
});
