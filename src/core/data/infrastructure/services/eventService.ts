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

async function createTripEvent(data: FormValues): Promise<Event | undefined> {
  try {
    const formattedData = {
      trip_id: data.tripId,
      event_name: data.eventName,
      location: data.location,
      cost: data.cost.map((cost) => ({
        category: cost.category,
        value: cost.cost,
      })),
      start_date: data.dateRange.start,
      end_date: data.dateRange.end,
    };

    const res = await eventApi.post(`/event`, formattedData);
    if (!res.data) {
      throw new Error('오류 발생');
    }

    return res.data;
  } catch (error) {
    console.log('이벤트가 제대로 전송되지 않았습니다.', error);
    throw error;
  }
}

export { createTripEvent };
