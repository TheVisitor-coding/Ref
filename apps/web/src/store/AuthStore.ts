import type { User } from '@/types/User';
import { create } from 'zustand';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => Promise<void>;
  reset: () => void;
  syncFromApi: (data: { authenticated: boolean; user: User | null }) => void;
}

export type AuthStoreType = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const useAuthStore = create<AuthStoreType>()((set) => ({
  ...initialState,
  setUser: (user) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ ...initialState, isLoading: false });
    }
  },
  reset: () => set({ ...initialState, isLoading: false }),
  syncFromApi: (data) => {
    set({ user: data.user, isAuthenticated: data.authenticated, isLoading: false, error: null });
  },
}));

export default useAuthStore;