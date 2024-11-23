import { create } from 'zustand';

import { Event } from '@/core/domain/entities/event.ts';

interface UserTripEventState {
  selectedTripId: number | null;
  tripEvents: Event[];
  setSelectedTripId: (tripId: number | null) => void;
  fetchTripEvents: (tripId: number) => Promise<void>;
  updateEventCoordinates: () => Promise<void>;
}

export const useUserTripEventStore = create<UserTripEventState>((set, get) => ({
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

  // tripData에 좌표 추가.
  updateEventCoordinates: async () => {
    const { tripEvents } = get(); // 현재 상태에서 이벤트 가져오기.
    const geocoder = new window.google.maps.Geocoder();

    // 좌표 없는 이벤트 필터링.
    const eventsWithoutCoordinates = tripEvents.filter(
      (event) => event.latitude === undefined || event.location === undefined,
    );

    // 좌표 주입.
    if (eventsWithoutCoordinates.length > 0) {
      const updatedEventsPromises = eventsWithoutCoordinates.map((event) => {
        return new Promise<Event>((resolve) => {
          geocoder.geocode({ address: event.location }, (result, status) => {
            if (result === null) {
              return console.log('result is null');
            }

            // result에 값이 존재하는지 확인
            if (status === 'OK' && result[0]) {
              const { lat, lng } = result[0].geometry.location;
              resolve({
                ...event,
                latitude: lat(),
                longitude: lng(),
              });
            } else {
              console.error(`Geocoding failed for ${event.location}: `, status);
              resolve(event); // 실패 시 원래 이벤트 반환
            }
          });
        });
      });

      // Geocoding 완료 후 상태 업데이트
      const updatedEvents = await Promise.all(updatedEventsPromises);

      set({
        tripEvents: tripEvents.map(
          (event) =>
            updatedEvents.find((e) => e.event_id === event.event_id) || event,
        ),
      });
    }
  },
}));
