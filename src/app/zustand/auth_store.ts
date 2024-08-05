import { UserCredential } from "../lib/definitions";
import { create } from "zustand";

interface AuthStore {
  user: UserCredential | null;
  login: (user: UserCredential) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (user) => {
    set({ user: user });
  },
  logout: () => {
    set({ user: null });
  },
}));
