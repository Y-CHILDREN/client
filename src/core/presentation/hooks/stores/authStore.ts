import { create } from 'zustand';
import User from '../../../domain/entities/user';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => {
        console.log('Setting user:', user);
        set({ user });
      },
      setToken: (token) => {
        console.log('Setting token:', token);
        set({ token });
      },
      clearAuth: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
);

// 개발 환경에서 디버깅용
if (process.env.NODE_ENV === 'development') {
  (
    window as Window & typeof globalThis & { authStore: typeof useAuthStore }
  ).authStore = useAuthStore;
}
