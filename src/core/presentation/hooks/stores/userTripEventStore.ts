import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Event } from '@/core/domain/entities/event.ts';

interface UserTripEventState {
  selectedTripId: number | null;
  tripEvents: Event[];
  setSelectedTripId: (tripId: number | null) => void;
  fetchTripEvents: (tripId: number) => Promise<void>;
  updateEventCoordinates: () => Promise<void>;
  updateEventPhotos: () => Promise<void>;
}

export const useUserTripEventStore = create(
  persist<UserTripEventState>(
    (set, get) => ({
      selectedTripId: null,
      tripEvents: [],

      setSelectedTripId: (tripId) => set({ selectedTripId: tripId }),

      fetchTripEvents: async (tripId) => {
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

      // Event에 좌표 추가.
      updateEventCoordinates: async () => {
        const { tripEvents } = get(); // 현재 상태에서 이벤트 가져오기.
        const geocoder = new window.google.maps.Geocoder();

        // 좌표 없는 이벤트 필터링.
        const eventsWithoutCoordinates = tripEvents.filter(
          (event) =>
            event.latitude === undefined || event.location === undefined,
        );

        // 좌표 주입.
        if (eventsWithoutCoordinates.length > 0) {
          const updatedEventsPromises = eventsWithoutCoordinates.map(
            (event) => {
              return new Promise<Event>((resolve) => {
                geocoder.geocode(
                  { address: event.location },
                  (result, status) => {
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
                      console.error(
                        `Geocoding failed for ${event.location}: `,
                        status,
                      );
                      resolve(event); // 실패 시 원래 이벤트 반환
                    }
                  },
                );
              });
            },
          );

          // Geocoding 완료 후 상태 업데이트
          const updatedEvents = await Promise.all(updatedEventsPromises);

          set({
            tripEvents: tripEvents.map(
              (event) =>
                updatedEvents.find((e) => e.event_id === event.event_id) ||
                event,
            ),
          });
        }
      },

      // Event에 사진 추가.
      updateEventPhotos: async () => {
        const { tripEvents } = get();
        const placesService = new window.google.maps.places.PlacesService(
          document.createElement('div'),
        );

        // 사진 없는 이벤트 필터링.
        const eventsWithoutPhoto = tripEvents.filter(
          (event) => event.place_image === undefined,
        );

        const updatedEventsPromises = eventsWithoutPhoto.map((event) => {
          return new Promise<Event>((resolve) => {
            // Places API를 사용하여 장소의 상세 정보 검색
            placesService.findPlaceFromQuery(
              {
                query: event.location,
                fields: ['place_id', 'photos'],
              },
              (results, status) => {
                if (
                  status === window.google.maps.places.PlacesServiceStatus.OK &&
                  results &&
                  results[0] &&
                  results[0].photos
                ) {
                  const firstPhoto = results[0].photos[0]; // 첫번째 검색걸과의 첫번째 사진.
                  const photoUrl = firstPhoto.getUrl({
                    maxWidth: 400,
                    maxHeight: 400,
                  });
                  resolve({ ...event, place_image: photoUrl });
                } else {
                  console.error(
                    `Places API search failed for ${event.location}: `,
                    status,
                  );
                  resolve(event); // 사진 정보 없을 경우 원래 이벤트 반환.
                }
              },
            );
          });
        });

        // 모든 데이터에 대한 프로미스가 해결되면 이벤트 상태 업데이트.
        const updatedEventsWithPhotos = await Promise.all(
          updatedEventsPromises,
        );

        set({
          tripEvents: updatedEventsWithPhotos,
        });
      },
    }),
    {
      name: 'tripId-storage',
      partialize: (state) => ({
        selectedTripId: state.selectedTripId,
        tripEvents: state.tripEvents,
        setSelectedTripId: state.setSelectedTripId,
        fetchTripEvents: state.fetchTripEvents,
        updateEventCoordinates: state.updateEventCoordinates,
        updateEventPhotos: state.updateEventPhotos,
      }),
    },
  ),
);
