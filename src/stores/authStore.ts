import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  username: string;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: "",
      login: (username: string) => set({ isAuthenticated: true, username }),
      logout: () => set({ isAuthenticated: false, username: "" }),
    }),
    {
      name: "auth-storage", // key in localStorage
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        username: state.username,
      }),
    },
  ),
);
