import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../hooks/stores/authStore';
import IntroMessage from '../components/home/IntroMessage';
import OngoingTrip from '../components/home/OngoingTrip';
// import UpcomingTrip from '../components/home/UpcomingTrip';

const Home: React.FC = () => {
  const { user } = useAuthStore();
  const [hasOngoingTrip, setHasOngoingTrip] = useState<boolean>(false);
  const [ongoingTripData, setOngoingTripData] = useState<any>({});
  // const [hasUpcomingTrip, setHasUpcomingTrip] = useState<boolean>(false);
  // const [hasPastTrip, setHasPastTrip] = useState<boolean>(false);
  const [tripData, setTripData] = useState<any[]>([]);

  useEffect(() => {
    const checkOngoingTrip = async () => {
      try {
        //일단 유저 3번으로 설정해둠. 나중에 수정 요망.${user.id}
        const response = await fetch(
          `http://localhost:3000/trips/user/${user.id}`,
        );
        const data = await response.json();
        setTripData(data);
        const currentDate = new Date();
        const ongoingTripIndex = data.findIndex((trip: any) => {
          const startDate = new Date(trip.start_date);
          const endDate = new Date(trip.end_date);
          return startDate <= currentDate && currentDate <= endDate;
        });

        setHasOngoingTrip(ongoingTripIndex !== -1);
        setOngoingTripData(data[ongoingTripIndex]);
        // 여행 정보 받아오기
        // setTripName(data.tripName);
        // setTripDate(data.tripDate);
      } catch (error) {
        console.error('Failed to fetch ongoing trip status:', error);
        setHasOngoingTrip(false);
      }
    };

    checkOngoingTrip();
  }, []);

  return (
    <div className="flex w-[375px] h-[812px] flex-col items-start bg-white border shadow relative">
      {/* header */}
      <div className="flex h-[60px] px-5 items-center gap-2 shrink-0 self-stretch bg-white">
        <p className="text-black text-center font-pretendard text-[18px] font-semibold leading-[24px]">
          JTRIP
        </p>
      </div>
      <div>
        {/* contents */}
        <div>
          {/* title */}
          <div>
            <IntroMessage
              userName={user?.nickname ?? '비회원'}
              hasOngoingTrip={hasOngoingTrip}
            />
          </div>
          {/* section */}
          <div>
            <OngoingTrip
              hasOngoingTrip={hasOngoingTrip}
              ongoingTripData={ongoingTripData}
            />
          </div>
          {/* trips */}
          <div>
            <div>
              {/* <UpcomingTrip
              // hasUpcomingTrip={hasUpcomingTrip}
              // hasPastTrip={hasPastTrip}
              /> */}
            </div>
          </div>
          {/* button */}
          <Link to="/create-trip">
            <button className="flex px-5 pl-4 py-3 items-center gap-2 absolute right-5 bottom-[84px] rounded-[160px] bg-[#3ACC97] text-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.08),0px_4px_8px_0px_rgba(0,0,0,0.08),0px_6px_12px_0px_rgba(0,0,0,0.12)]">
              + 새로운 여행
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
