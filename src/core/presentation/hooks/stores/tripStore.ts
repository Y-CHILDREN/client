import { create } from 'zustand';
import User from '@/core/domain/entities/user.ts';
import { Trip } from '@/core/domain/entities/trip.ts';

interface TripStore {
  tripData: Trip | null;
  step: number;
  setStep: (direction: 'next' | 'previous') => void;
  setTripData: (trip: Trip) => void;
  resetStep: () => void;
  fetchTripMembers: (emails: string[]) => Promise<User[]>;
  fetchTrip: (tripId: number) => Promise<Trip | undefined>;
}

const useTripStore = create<TripStore>((set) => ({
  // get
  tripData: null,
  step: 1,

  // set
  setStep: (direction) =>
    set((state) => ({
      step: direction === 'next' ? state.step + 1 : state.step - 1,
    })),

  // reset
  resetStep: () => set({ step: 1 }),

  setTripData: (trip: Trip) => {
    set({ tripData: trip });
  },

  // 멤버 조회
  fetchTripMembers: async (emails: string[]) => {
    if (!emails || emails.length === 0) return [];

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/emails`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ emails }),
        },
      );
      if (!response.ok) {
        throw new Error('멤버 정보를 불러오는 데 실패했습니다.');
      }

      const data: User[] = await response.json();
      return data;
    } catch (error) {
      console.error('fetchTripMembers error', error);
      return [];
    }
  },

  // 여행 조회
  fetchTrip: async (tripId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/trips/${tripId}`,
      );

      if (!response.ok) {
        throw new Error('여행 데이터를 불러오는 데 실패했습니다.');
      }

      const data: Trip = await response.json();
      console.log('data:', data);
      set({ tripData: data });
      return data;
    } catch (error) {
      console.error('여행 데이터 fetch 에러:', error);
    }
  },
}));

export default useTripStore;
