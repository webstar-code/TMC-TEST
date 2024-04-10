import { httpsCallable } from "firebase/functions";
import { callable, functions } from "lib/firebase";
import { ActiveSubscription } from "lib/store";

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
    .then((result) => result.data)
    .catch((err) => {
      throw err;
    });
};

const getActiveSubscription = async (userId: string) => {
  return await httpsCallable<unknown, { data: ActiveSubscription | null }>(
    functions,
    callable.getActiveSubscription
  )({ userId })
    .then((result) => result.data.data)
    .catch((err) => {
      throw err;
    });
};

interface Payload {
  paymentMethodId: string;
  subscriptionPlanId: string;
  recurring: IRecurringInterval;
  userId: string;
  name: string;
  email: string;
  phone: string;
}
const purchaseSubscription = async (payload: Payload) => {
  return await httpsCallable<unknown, any>(
    functions,
    callable.purchaseSubscription
  )({ ...payload })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const subscriptionsApi = {
  getSubscriptionPlans,
  getActiveSubscription,
  purchaseSubscription,
};
