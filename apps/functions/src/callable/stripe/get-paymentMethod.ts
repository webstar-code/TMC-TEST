import { HttpsError, onCall } from "firebase-functions/v2/https";
import joi from "joi";
import { stripe } from "../../utils/stripe";

exports.getPaymentMethod = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      "failed-precondition",
      "The function must be " + "called while authenticated."
    );
  }
  const schema = joi.object({
    customerId: joi.string().required(),
  });
  const validate = schema.validate(request.data);
  if (validate.error) {
    throw new HttpsError("invalid-argument", validate.error.message);
  }
  const { customerId } = request.data;

  if (customerId) {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      if (customer.deleted) {
        return {
          status: "success",
          data: null,
          message: "no user",
        };
        return;
      }
      const default_payment_method_id =
        customer?.invoice_settings.default_payment_method;
      if (!default_payment_method_id) {
        return { status: "failed", message: "Not found" };
        return;
      }
      const paymentMethod = await stripe.customers.retrievePaymentMethod(
        customerId,
        default_payment_method_id as string
      );
      return {
        status: "success",
        data: paymentMethod,
      };
    } catch (err) {
      return {
        status: "failed",
        data: null,
        message: "Invalid customer id",
      };
    }
  } else {
    return {
      status: "success",
      data: null,
      message: "Invalid customer id",
    };
  }
});
