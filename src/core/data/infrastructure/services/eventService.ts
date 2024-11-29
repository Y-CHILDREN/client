import axios from 'axios';
import { Event } from '../../../domain/entities/event.ts';
import { FormValues } from '../../../presentation/pages/AddEventPage.tsx';

const apiUrl = import.meta.env.VITE_API_URL;

const eventApi = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const createTripEvent = async (
  data: FormValues,
): Promise<Event | undefined> => {
  try {
    const res = await eventApi.post(`/event`, {
      trip_id: data.tripId,
      event_name: data.eventName,
      location: data.location,
      cost: data.cost.map((cost) => ({
        category: cost.category,
        value: cost.value,
      })),
      start_date: data.dateRange.start,
      end_date: data.dateRange.end,
    });
    if (!res.data) {
      throw new Error('오류 발생');
    }

    return res.data;
  } catch (error) {
    console.log('이벤트가 제대로 전송되지 않았습니다.', error);
    throw error;
  }
};

const getTripEvent = async (event_id: number): Promise<Event | undefined> => {
  try {
    const res = await eventApi.get(`/event/${event_id}`);
    if (!res.data) {
      throw new Error('오류 발생');
    }

    return res.data;
  } catch (error) {
    console.log('이벤트가 제대로 전송되지 않았습니다.', error);
    throw error;
  }
};

const updateTripEvent = async (
  { eventId, data }: { eventId: number | undefined; data: FormValues }, // 객체 형태로 인수 받기
): Promise<Event | undefined> => {
  try {
    console.log('업데이트할 데이터:', data);

    const response = await eventApi.patch(`/event/${eventId}`, {
      trip_id: data.tripId,
      event_name: data.eventName,
      location: data.location,
      cost: data.cost.map((cost) => ({
        category: cost.category,
        value: cost.value,
      })),
      start_date: data.dateRange.start?.toISOString(),
      end_date: data.dateRange.end?.toISOString(),
    });

    if (!response.data) {
      throw new Error('서버에서 응답을 받지 못했습니다.');
    }

    return response.data;
  } catch (error) {
    console.error('이벤트 수정 중 오류 발생:', error);
    throw error;
  }
};

export { createTripEvent, getTripEvent, updateTripEvent };
