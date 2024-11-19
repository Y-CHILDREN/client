import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../hooks/stores/authStore';
import IntroMessage from '../components/home/IntroMessage';
import OngoingTrip from '../components/home/OngoingTrip';
import TripList from '../components/home/TripList';

interface TripData {
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  id: number;
}

const Home: React.FC = () => {
  const { user } = useAuthStore();
  const [hasOngoingTrip, setHasOngoingTrip] = useState<boolean>(false);
  const [ongoingTripData, setOngoingTripData] = useState<TripData | undefined>(
    undefined,
  );
  const [hasUpcomingTrip, setHasUpcomingTrip] = useState<boolean>(false);
  const [upcomingTripData, setUpcomingTripData] = useState<TripData[]>([]);
  const [hasPastTrip, setHasPastTrip] = useState<boolean>(false);
  const [pastTripData, setPastTripData] = useState<TripData[]>([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkTripData = async () => {
      try {
        if (!user) return;

        const response = await fetch(`${apiUrl}/trips/user/${user.id}`);
        const data = await response.json();

        //OngoingTrip 유무 확인 & 넘겨줄 데이터 생성
        const currentDate = new Date();
        const ongoingTripIndex = data.findIndex((trip: any) => {
          const startDate = new Date(trip.start_date);
          const endDate = new Date(trip.end_date);
          return startDate <= currentDate && currentDate <= endDate;
        });
        setHasOngoingTrip(ongoingTripIndex !== -1);
        setOngoingTripData(data[ongoingTripIndex]);

        //UpcomingTrip 유무 확인 & 넘겨줄 데이터 생성
        const UpcomingTripIndex = data
          .map((trip: any) => {
            const startDate = new Date(trip.start_date);
            return startDate > currentDate ? trip.id : -1;
          })
          .filter((index: number) => index !== -1);
        setHasUpcomingTrip(UpcomingTripIndex.length > 0);
        setUpcomingTripData(
          data.filter((trip: any) => UpcomingTripIndex.includes(trip.id)),
        );

        //PastTrip 유무 확인 & 넘겨줄 데이터 생성
        const PastTripIndex = data
          .map((trip: any) => {
            const endDate = new Date(trip.end_date);
            return endDate < currentDate ? trip.id : -1;
          })
          .filter((index: number) => index !== -1);
        setHasPastTrip(PastTripIndex.length > 0);
        setPastTripData(
          data.filter((trip: any) => PastTripIndex.includes(trip.id)),
        );
      } catch (error) {
        console.error('Failed to fetch ongoing trip status:', error);
        setHasOngoingTrip(false);
      }
    };

    checkTripData();
  }, []);

  return (
    <>
      <div className="flex h-[60px] px-5 items-center gap-2 shrink-0 self-stretch bg-white relative">
        <p className="text-black text-center font-pretendard text-[18px] font-semibold leading-[24px]">
          JTRIP
        </p>
      </div>
      <div className="flex flex-col items-start self-stretch flex-1 pb-6 bg-white">
        {/* contents */}
        <div className="w-full">
          <IntroMessage
            userName={user?.nickname ?? '비회원'}
            hasOngoingTrip={hasOngoingTrip}
          />
          <div>
            <OngoingTrip
              hasOngoingTrip={hasOngoingTrip}
              ongoingTripData={ongoingTripData!}
            />
          </div>
          <div>
            <div>
              <TripList
                hasUpcomingTrip={hasUpcomingTrip}
                hasPastTrip={hasPastTrip}
                upcomingTripData={upcomingTripData}
                pastTripData={pastTripData}
              />
            </div>
          </div>
          <Link to="/create-trip">
            <button className="flex px-5 pl-4 py-3 items-center gap-2 absolute right-5 bottom-[60px] rounded-[160px] bg-[#3ACC97] text-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.08),0px_4px_8px_0px_rgba(0,0,0,0.08),0px_6px_12px_0px_rgba(0,0,0,0.12)]">
              + 새로운 여행
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
