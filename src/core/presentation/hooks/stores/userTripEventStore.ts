import { create } from 'zustand';

interface Cost {
  category: string;
  value: number;
}

interface TripEvent {
  trip_id: number;
  event_id: number;
  event_name: string;
  location: string;
  start_date: Date;
  end_date: Date;
  cost: Cost[];
}

export type { TripEvent, Cost };

interface UserTripEventState {
  selectedTripId: number | null;
  tripEvents: TripEvent[];
  setSelectedTripId: (tripId: number | null) => void;
  fetchTripEvents: (tripId: number) => Promise<void>;
}

export const useUserTripEventStore = create<UserTripEventState>((set) => ({
  selectedTripId: null,
  setSelectedTripId: (tripId) => set({ selectedTripId: tripId }),

  tripEvents: [],

  fetchTripEvents: async (tripId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/event/all/${tripId}`,
      );
      if (!response.ok) {
        throw new Error('이벤트 데이터를 불러오는데 실패했습니다.');
      }
      const data = await response.json();
      set({ tripEvents: data });
    } catch (error) {
      console.error('이벤트 데이터 fetch 에러:', error);
      set({ tripEvents: [] });
    }
  },
}));
