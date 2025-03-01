import { create } from 'zustand';
import User from '../../../domain/entities/user';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setAuthenticated: (authenticated: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: (user) => {
    sessionStorage.setItem('userId', user.id);
    set({ user, isAuthenticated: true });
  },
  setToken: (token) => {
    sessionStorage.setItem('token', token);
    document.cookie = `token=${token}; path=/; max-age=1800; secure; samesite=strict`;
    set({ token });
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  clearAuth: () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tripId-storage');
    document.cookie = 'token=; path=/; max-age=0';
    document.cookie = 'connect.sid=; path=/; max-age=0';
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
