import { create } from 'zustand';

interface TripStore {
  step: number;
  setStep: (direction: 'next' | 'previous') => void;
}

const useTripStore = create<TripStore>((set) => ({
  // get
  step: 1,

  // set
  setStep: (direction) =>
    set((state) => ({
      step: direction === 'next' ? state.step + 1 : state.step - 1,
    })),
}));

export default useTripStore;
