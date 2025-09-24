import { AuthStoreType, User } from "@/types/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User) => set({ user }),
      setToken: async (token: string) => {
        try {
            await fetch('/api/auth/set-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });
        } catch (error) {
          console.error("Failed to set token cookie:", error);
        }
      },
      setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
      logout: async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (error) {
          console.error("Failed to delete token cookie:", error);
        }
        set({ user: null, isAuthenticated: false })
      }
    }),
    {
      name: "auth",
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default authStore;