import { authApi } from "api/authApi1";
import { create } from "zustand";

interface AdminStoreState {
  admin: {
    createdAt: string;
    id: string;
    email: string;
  } | null;
  getAdmin: (id: string) => void;
}

export const useAdminStore = create<AdminStoreState>((set) => ({
  admin: null,
  getAdmin: async (id: string) => {
    const result = await authApi.getAdminById(id);
    set({ admin: result as any });
  },
}));
