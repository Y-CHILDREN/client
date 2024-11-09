import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../hooks/stores/authStore';
import IntroMessage from '../components/home/IntroMessage';
import OngoingTrip from '../components/home/OngoingTrip';
import UpcomingTrip from '../components/home/UpcomingTrip';

const Home: React.FC = () => {
  const { user } = useAuthStore();
  const [hasOngoingTrip, setHasOngoingTrip] = useState<boolean>(false);
  const [ongoingTripData, setOngoingTripData] = useState<object>({});
  const [hasUpcomingTrip, setHasUpcomingTrip] = useState<boolean>(false);
  const [upcomingTripData, setUpcomingTripData] = useState<Array<object>>([]);
  const [hasPastTrip, setHasPastTrip] = useState<boolean>(false);
  const [pastTripData, setPastTripData] = useState<Array<object>>([]);

  useEffect(() => {
    const checkTripData = async () => {
      try {
        //일단 유저 3번으로 설정해둠. 나중에 수정 요망.${user.id}
        const response = await fetch(`http://localhost:3000/trips/user/${3}`);
        const data = await response.json();
        //OngoingTrip에 넘겨줄 데이터
        const currentDate = new Date();
        const ongoingTripIndex = data.findIndex((trip: any) => {
          const startDate = new Date(trip.start_date);
          const endDate = new Date(trip.end_date);
          return startDate <= currentDate && currentDate <= endDate;
        });
        setHasOngoingTrip(ongoingTripIndex !== -1);
        setOngoingTripData(data[ongoingTripIndex]);

        //UpcomingTrip에 넘겨줄 데이터
        const UpcomingTripIndex = data
          .map((trip: any, index: number) => {
            const startDate = new Date(trip.start_date);
            return startDate > currentDate ? index : -1;
          })
          .filter((index: number) => index !== -1);
        setHasUpcomingTrip(UpcomingTripIndex.length > 0);
        setUpcomingTripData(
          data.filter((trip: any) => UpcomingTripIndex.includes(trip.id)),
        );

        //PastTrip에 넘겨줄 데이터
        const PastTripIndex = data
          .map((trip: any, index: number) => {
            const endDate = new Date(trip.end_date);
            return endDate < currentDate ? index : -1;
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

  console.log('hasUpcomingTrip is', hasUpcomingTrip);
  console.log('upcomingTripData is', upcomingTripData);
  console.log('hasPastTrip is', hasPastTrip);
  console.log('pastTripData is', pastTripData);

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
              <UpcomingTrip
                hasUpcomingTrip={hasUpcomingTrip}
                hasPastTrip={hasPastTrip}
                upcomingTripData={upcomingTripData}
                pastTripData={pastTripData}
              />
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
