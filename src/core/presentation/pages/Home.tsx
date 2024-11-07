import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IntroMessage from '../components/home/IntroMessage';
import OngoingTrip from '../components/home/OngoingTrip';
import UpcomingTrip from '../components/home/UpcomingTrip';

const Home: React.FC = () => {
  // 사용자 이름 '은석'으로 초기값 설정해둠. 나중에 수정 요망.
  const [userName, setUserName] = useState<string>('은석');

  const [hasOngoingTrip, setHasOngoingTrip] = useState<boolean>(false);
  const [hasUpcomingTrip, setHasUpcomingTrip] = useState<boolean>(false);
  const [hasPastTrip, setHasPastTrip] = useState<boolean>(false);
  const [tripName, setTripName] = useState<string>('');
  const [tripDate, setTripDate] = useState<Date | null>(null);

  useEffect(() => {
    const checkOngoingTrip = async () => {
      try {
        // API 엔드포인트는 실제 사용하시는 것으로 변경해주세요
        const response = await fetch('/api/trips/ongoing');
        const data = await response.json();

        // 진행 중, 다가오는, 다녀온 여행이 있는지 확인
        setHasOngoingTrip(data.hasOngoingTrip);
        setHasUpcomingTrip(data.hasUpcomingTrip);
        setHasPastTrip(data.hasPastTrip);

        // 여행 정보 받아오기
        setTripName(data.tripName);
        setTripDate(data.tripDate);

        // 사용자 이름도 함께 가져오기
        setUserName(data.userName);
        // setUserName('태정');
      } catch (error) {
        console.error('Failed to fetch ongoing trip status:', error);
        setHasOngoingTrip(false);
      }
    };

    checkOngoingTrip();
  }, []);

  return (
    <div className="flex w-[375px] h-[812px] flex-col items-start bg-white border shadow">
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
            <IntroMessage userName={userName} hasOngoingTrip={hasOngoingTrip} />
          </div>
          {/* section */}
          <div>
            <OngoingTrip
              hasOngoingTrip={hasOngoingTrip}
              tripName={tripName}
              tripDate={tripDate}
            />
          </div>
          {/* trips */}
          <div>
            <div>
              <UpcomingTrip
                hasUpcomingTrip={hasUpcomingTrip}
                hasPastTrip={hasPastTrip}
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
