import { httpsCallable } from "firebase/functions";
import { callable, functions } from "lib/firebase";
import { apiMiddleware } from "./middleware";
import { Timestamp } from "firebase/firestore";

export type IRecurringInterval = "month" | "year";

export interface ISubscriptionPlan {
  id: string;
  pricing: {
    month: number;
    year: number;
  };
  createdAt: string;
  updatedAt: string;
}

const getSubscriptionPlans = async () => {
  return await httpsCallable<unknown, ISubscriptionPlan[]>(
    functions,
    callable.getSubscriptionPlans
  )()
    .then((result) => apiMiddleware.fromJson(apiMiddleware.toJson(result.data)))
    .catch((err) => {
      throw err;
    });
};

const createSubscriptionPlan = async () => {
  return await httpsCallable<unknown, ISubscriptionPlan[]>(
    functions,
    callable.createSubscriptionPlan
  )({ name: "default" })
    .then((result) => result.data)
    .catch((err) => {
      throw err;
    });
};

const createPricing = async (payload: {
  subscriptionId: string;
  price: number;
  interval: IRecurringInterval;
}) => {
  return await httpsCallable<unknown, ISubscriptionPlan[]>(
    functions,
    callable.createPricing
  )({ ...payload })
    .then((result) => result.data)
    .catch((err) => {
      throw err;
    });
};

const updatePricing = async (payload: {
  subscriptionId: string;
  price: number;
  interval: IRecurringInterval;
}) => {
  return await httpsCallable<unknown, ISubscriptionPlan[]>(
    functions,
    callable.updatePricing
  )({ ...payload })
    .then((result) => result.data)
    .catch((err) => {
      throw err;
    });
};

export const subscriptionsApi = {
  getSubscriptionPlans,
  createSubscriptionPlan,
  createPricing,
  updatePricing,
};
