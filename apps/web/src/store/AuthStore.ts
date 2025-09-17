import { AuthStoreType, User } from "@/types/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user: User) => set({ user }),
      setToken: (token: string) => set({ token }),
      setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
      logout: () => set({ user: null, token: null, isAuthenticated: false })
    }),
    {
      name: "auth",
      partialize: (state) => ({ 
        token: state.token, 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default authStore;