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
  customerId?: string;
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
  logout: () => Promise<null>;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  getUser: async (id) => {
    const result = await authApi.getUserById(id);
    set({ user: result.data });
    return result;
  },
  logout: async () => {
    const result = await authApi.logout();
    set({ user: null });
    return null;
  },
}));

// TODO: move to packages/types
export interface ActiveSubscription {
  id: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  status: string;
  customerId: string;
  startDate: string;
  cancelAt: string | null;
  canceledAt: string | null;
  cancelAtPeriodEnd: string | null;
  plan: {
    name: string;
    amount: number;
    currency: string;
    interval: string;
  };
  createdAt: string;
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
      set({ activeSubscription: result.data });
      return result.data;
    },
  })
);
