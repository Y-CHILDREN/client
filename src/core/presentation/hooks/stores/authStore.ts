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
    localStorage.setItem('userId', user.id);
    set({ user, isAuthenticated: true });
  },
  setToken: (token) => {
    localStorage.setItem('token', token);
    document.cookie = `token=${token}; path=/; max-age=1800; secure; samesite=strict`;
    set({ token });
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  clearAuth: () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('tripId-storage');
    document.cookie = 'token=; path=/; max-age=0';
    document.cookie = 'connect.sid=; path=/; max-age=0';
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
