import { onCall } from "firebase-functions/v2/https";
import admin from "firebase-admin";

exports.verifyOtp = onCall(async (request) => {
  const email = request.data.email;
  const otp = request.data.otp;

  if (email && otp) {
    const emailOtpRef = admin
      .firestore()
      .collection("emailotp")
      .where("to", "==", email)
      .where("expiry", ">=", Date.now())
      .orderBy("expiry", "desc")
      .limit(1)
      .get();
    const otpDocs = (await emailOtpRef).docs;
    if (otpDocs.length > 0) {
      const emailOtpData = otpDocs[0].data();
      if (emailOtpData.otp == otp) {
        return {
          status: 200,
          success: true,
          message: "OTP verified successfully.",
        };
      } else {
        return { status: 200, success: false, message: "Incorrect OTP" };
      }
    } else {
      return {
        status: 200,
        success: false,
        message: "OTP not found or expired.",
      };
    }
  } else {
    return { status: 302, message: "No Email Found." };
  }
});
