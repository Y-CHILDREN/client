import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import User from '../../../domain/entities/user';

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
        localStorage.setItem('userId', user.id);
        set({ user });
      },
      setToken: (token) => {
        console.log('Setting token:', token);
        // 쿠키와 localStorage 모두 설정
        document.cookie = `token=${token}; path=/; max-age=1800; secure; samesite=strict`;
        set({ token });
      },
      clearAuth: () => {
        // 쿠키 삭제
        document.cookie = 'token=; path=/; max-age=0';
        document.cookie = 'connect.sid=; path=/; max-age=0';
        // localStorage 항목 삭제
        localStorage.removeItem('userId');
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
