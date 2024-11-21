import { create } from 'zustand';

interface GoogleMapsStore {
  isLoaded: boolean;
  error: boolean;
  setLoaded: (loaded: boolean) => void;
  setError: (error: boolean) => void;
}

export const useGoogleMapsStore = create<GoogleMapsStore>((set) => ({
  isLoaded: false,
  error: false,
  setLoaded: (loaded: boolean) => set({ isLoaded: loaded }),
  setError: (error: boolean) => set({ error }),
}));
