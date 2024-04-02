import { onCall } from "firebase-functions/v2/https";
import admin from "firebase-admin";
import { emails } from "../utils/emails";

exports.sendOtp = onCall(async (request) => {
  const email = request.data.email;
  if (email) {
    const mailOtpCollection = admin.firestore().collection("emailotp");
    const otp = Math.floor(Math.random() * (9999 - 1111 + 1)) + 111111;
    await mailOtpCollection.add({
      to: email,
      otp,
      expiry: Date.now() + 30 * 60000,
      createdAt: new Date(),
    });
    return emails
      .otpCode(email, { otp })
      .then(() => {
        return { status: 200, message: "OTP sent" };
      })
      .catch((error) => {
        console.error(error);
        return { status: 500, message: "Something went wrong" };
      });
  } else {
    return { status: 302, message: "No Email Found." };
  }
});
