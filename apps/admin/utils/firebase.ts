// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

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
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);

export const callable = {
  getSubscriptionPlans: "getSubscriptionPlans",
  createSubscriptionPlan: "createSubscriptionPlan",
  createPricing: "createPricing",
  updatePricing: "updatePricing",
};

export const dbCollections = {};
