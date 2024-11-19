import { create } from 'zustand';
import { Trip } from '../../../domain/entities/trip';

interface UserTripState {
  tripData: Trip[];
  setTripData: (trip: Trip[]) => void;
  getDday: (trip: Trip) => string;
  getActiveTrips: (activeTab: string) => Trip[];
}

export const useUserTripStore = create<UserTripState>()((set, get) => ({
  tripData: [],
  setTripData: (trip: Trip[]) => {
    set({ tripData: trip });
  },

  getDday: (trip: Trip) => {
    const startDate = new Date(trip.start_date || '');
    const endDate = new Date(trip.end_date || '');
    const currentDate = new Date();

    // 현재 날짜가 여행 기간 내에 있는지 확인
    if (currentDate >= startDate && currentDate <= endDate) {
      return '여행중';
    }

    // 그 외의 경우 D-day 계산
    const dDay = Math.ceil(
      (startDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (dDay === 0) return 'Day';
    return dDay > 0 ? `-${Math.abs(dDay)}` : `+${Math.abs(dDay)}`;
  },

  //현재 날짜 기준 여행 데이터 필터링
  getActiveTrips: (activeTab: string) => {
    const { tripData } = get();
    return activeTab === '예정된 여행'
      ? tripData.filter((trip) => {
          const startDate = new Date(trip.start_date || '');
          return startDate > new Date();
        })
      : activeTab === '여행중'
        ? tripData.filter((trip) => {
            const startDate = new Date(trip.start_date || '');
            const endDate = new Date(trip.end_date || '');
            const currentDate = new Date();
            return currentDate >= startDate && currentDate <= endDate;
          })
        : activeTab === '완료된 여행'
          ? tripData.filter((trip) => {
              const endDate = new Date(trip.end_date || '');
              return endDate < new Date();
            })
          : [];
  },
}));
