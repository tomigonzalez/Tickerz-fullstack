// /store/authStore.ts

import { create } from "zustand";
import type { AuthStore, AuthUser } from "@/types/auth";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  login: (user: AuthUser, token: string) => set({ user, token }),
  logout: () => set({ user: null, token: null })
}));
