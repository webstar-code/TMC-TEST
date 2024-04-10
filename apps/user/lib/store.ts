import { IResponse, authApi } from "api/auth";
import { subscriptionsApi } from "api/subscription";
import { create } from "zustand";

interface LegalConsent {
  accepted: boolean;
  version: number;
  consentDate: string;
}

// TODO: move to packages/types
export interface IUser {
  id: string;
  email: string;
  preferences: {
    langauge: "en";
  };
  patientId?: string;
  tncConsent?: LegalConsent;
  privacyPolicyConsent?: LegalConsent;
  patientDetailsSubmitted: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  isSubscriptionPurchased: boolean;
  isSubscriptionActive: boolean;
}

interface UserStoreState {
  user: IUser | null;
  getUser: (id: string) => Promise<IResponse<IUser>>;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  getUser: async (id) => {
    const result = await authApi.getUserById(id);
    set({ user: result.data });
    return result;
  },
}));

// TODO: move to packages/types
export interface ActiveSubscription {
  id: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  planId: string;
  status: string;
  plan: {
    name: string;
    amount: number;
    currency: string;
    interval: string;
  };
}
interface ActiveSubscriptionStoreState {
  activeSubscription: ActiveSubscription | null;
  getActiveSubscription: (id: string) => Promise<ActiveSubscription | null>;
}
export const useActiveSusbcription = create<ActiveSubscriptionStoreState>(
  (set) => ({
    activeSubscription: null,
    getActiveSubscription: async (userId) => {
      const result = await subscriptionsApi.getActiveSubscription(userId);
      set({ activeSubscription: result });
      return result;
    },
  })
);
