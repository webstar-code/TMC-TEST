import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// export const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_apiKey,
//   authDomain: process.env.NEXT_PUBLIC_authDomain,
//   projectId: process.env.NEXT_PUBLIC_projectId,
//   storageBucket: process.env.NEXT_PUBLIC_storageBucket,
//   messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
//   appId: process.env.NEXT_PUBLIC_appId,
//   measurementId: process.env.NEXT_PUBLIC_measurementId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBxEZLk-cAsqIloO5-d8kRVTX2nw4pHI7E",
  authDomain: "tmc-canada.firebaseapp.com",
  projectId: "tmc-canada",
  storageBucket: "tmc-canada.appspot.com",
  messagingSenderId: "860563755847",
  appId: "1:860563755847:web:5685cad03e515c0a98f262",
  measurementId: "G-75TVL9Z4JJ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export const dbCollections = {
  users: "users",
};

export const callable = {
  sendOtp: "sendOtp",
  verifyOtp: "verifyOtp",
  resetPassword: "resetPassoword",
  getSubscriptionPlans: "getSubscriptionPlans",
  purchaseSubscription: "purchaseSubscription",
  getActiveSubscription: "getActiveSubscription",
};
