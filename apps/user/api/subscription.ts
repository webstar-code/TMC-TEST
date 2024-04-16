import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { callable, db, dbCollections, functions } from "lib/firebase";
import { ActiveSubscription } from "lib/store";
import { apiMiddleware } from "./middlware";
import { IResponse } from "./auth";

export type IRecurringInterval = "month" | "year";

export interface ISubscriptionPlan {
  id: string;
  pricing: {
    month: number;
    year: number;
  };
  features: { name: string }[];
  active: boolean;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const getSubscriptionPlans = async () => {
  // return await httpsCallable<unknown, ISubscriptionPlan[]>(
  //   functions,
  //   callable.getSubscriptionPlans
  // )()
  //   .then((result) => result.data)
  //   .catch((err) => {
  //     throw err;
  //   });
  const queryS = await getDocs(collection(db, "subscription-plans"));
  return queryS.docs.map((q) => q.data()) as ISubscriptionPlan[];
};

const getActiveSubscription = async (customerId: string) => {
  return await httpsCallable<unknown, IResponse<ActiveSubscription | null>>(
    functions,
    callable.getActiveSubscription
  )({ customerId })
    .then((result) => result.data)
    .catch((err) => {
      throw err;
    });
};

interface PurchaseSubscriptionPayload {
  subscriptionPlanId: string;
  interval: IRecurringInterval;
  userId: string;
}
const purchaseSubscription = async (payload: PurchaseSubscriptionPayload) => {
  return await httpsCallable<unknown, any>(
    functions,
    callable.createSubscription
  )({ ...payload })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      throw err;
    });
};

interface UpdateSubscription {
  recurring: IRecurringInterval;
  subscriptionId: string;
}
const updateSubscription = async (payload: UpdateSubscription) => {
  return await httpsCallable<unknown, any>(
    functions,
    callable.updateSubscription
  )({ ...payload })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      throw err;
    });
};
interface CancelSubscription {
  subscriptionId: string;
}
const cancelSubscription = async (payload: CancelSubscription) => {
  return await httpsCallable<unknown, any>(
    functions,
    callable.cancelSubscription
  )({ ...payload })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      throw err;
    });
};

const attachPaymentMethod = async (payload: {
  userId: string;
  customerId?: string;
  name: string;
  email: string;
  phoneNumber: string;
  paymentMethodId: string;
}) => {
  return await httpsCallable<unknown, any>(
    functions,
    callable.attachPaymentMethod
  )({ ...payload })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      throw err;
    });
  // fetch("http://localhost:8000/attach-paymentMethod", {
  //   method: "POST",
  //   headers: {
  //     "Content-type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     ...payload
  //   })
  // }).then((res) => res.json())
  //   .then(res => console.log(res))
};

const getPaymentMethod = async (payload: { customerId: string }) => {
  return await httpsCallable<unknown, any>(
    functions,
    callable.getPaymentMethod
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
  updateSubscription,
  cancelSubscription,
  attachPaymentMethod,
  getPaymentMethod,
};
