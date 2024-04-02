import { onCall } from "firebase-functions/v2/https";
import admin from "firebase-admin";

exports.resetPassword = onCall(async (request) => {
  const uid = request.data.uid;
  const newPassword = request.data.newPassword;
  if (uid) {
    return await admin
      .auth()
      .updateUser(uid, {
        password: newPassword,
      })
      .then(() => {
        return { status: 200, success: true, message: "User updated." };
      })
      .catch(() => {
        return {
          status: 200,
          success: false,
          message: "Failed to update user",
        };
      });
  } else {
    return { status: 302, success: false, message: "Something went wrong." };
  }
});
