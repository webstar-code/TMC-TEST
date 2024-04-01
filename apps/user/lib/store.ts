import { authApi } from 'api/auth';
import { create } from 'zustand'

interface LegalConsent {
  accepted: boolean,
  version: number
  consentDate: string,
}

// TODO: move to packages/types
export interface IUser {
  id: string,
  email: string,
  preferences: {
    langauge: "en"
  },
  tncConsent?: LegalConsent,
  privacyPolicy?: LegalConsent,
  createdAt: Date | string,
  updatedAt: Date | string
  isSubscriptionPurchased: boolean,
  isSubscriptionActive: boolean,
}

interface UserStoreState {
  user: IUser | null,
  getUser: (id: string) => void;
}

export const useVendorStore = create<UserStoreState>((set) => ({
  user: null,
  getUser: async (id) => {
    const result = await authApi.getUserById(id);
    set({ user: result.data })
  }
}))
