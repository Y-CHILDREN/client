// OngoingTrip.tsx
import React from 'react';
import Beach from '../../assets/home/Beach.png';
import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Link } from 'react-router-dom';
import TripThumbnail from './TripThumbnail';

interface OngoingTripProps {
  hasOngoingTrip: boolean;
  ongoingTripData: {
    name: string;
    destination: string;
    start_date: string;
    end_date: string;
    id: number;
  };
}
const OngoingTrip: React.FC<OngoingTripProps> = ({
  hasOngoingTrip,
  ongoingTripData,
}) => {
  const dayCount = hasOngoingTrip
    ? Math.ceil(
        (new Date().getTime() -
          new Date(ongoingTripData.start_date).getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : 0;
  console.log(dayCount);
  return (
    <div className="flex px-6 items-center self-stretch">
      {/* 진행중인 여행 있는지 여부에 따라 다른 콘텐츠 노출 */}
      {hasOngoingTrip ? (
        <Link to={`/trip/${ongoingTripData.id}`}>
          <Card className="relative flex w-[327px] h-[327px] p-0 overflow-hidden rounded-xl">
            {/* flex-col  items-start  */}
            <div className="w-full h-full relative">
              <TripThumbnail
                className="object-cover"
                destination={ongoingTripData.destination}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
              {/* 여행 시작 전이면 버튼 표시 안하게끔 함
            {dayCount > 0 && <button>여행 {dayCount} 일차</button>} */}
              <div className="absolute left-4 top-4">
                <span className="rounded-md bg-black/30 px-2.5 py-1.5 flex items-center truncate text-white font-pretendard text-sm font-normal leading-5 line-clamp-1">
                  여행 {dayCount}일차
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <h3 className="text-lg font-semibold text-white text-left leading-6 overflow-hidden truncate font-pretendard">
                  {ongoingTripData.name}
                </h3>
                <p className="text-sm text-white text-left font-pretendard font-normal leading-5 overflow-hidden truncate">
                  {new Date(ongoingTripData.start_date).toLocaleDateString(
                    'ko-KR',
                  )}
                  -
                  {new Date(ongoingTripData.end_date).toLocaleDateString(
                    'ko-KR',
                  )}
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ) : (
        /* 진행중인 콘텐츠 없을 때 */
        <Card className="w-[327px] h-[327px] p-6 pt-8 pb-6 flex-col flex-1 gap-4 items-center roudned-xl bg-gray-100">
          <div className="flex flex-col items-center gap-2 flex-1 self-stretch">
            <div className="flex flex-col items-center gap-2 flex-1 self-stretch">
              <p className="text-gray-900 text-center font-pretendard text-base font-semibold leading-6">
                누구나 J처럼 <br /> 여행 게획을 만들 수 있어요!
              </p>
            </div>
            <div className="flex justify-center items-center">
              <img
                className="items-center w-[148px] h-[148px] bg-[url('/path-to-image')] bg-lightgray bg-center bg-cover bg-no-repeat"
                src={Beach}
                alt="icon"
              />
            </div>
          </div>
          <div>
            <Link to="/create-trip">
              <Button className="flex h-12 px-5 py-3 justify-center items-center gap-2 shrink-0 self-stretch rounded-lg bg-[#3ACC97] w-full text-white font-pretendard text-sm font-semibold leading-5 text-center">
                새로운 여행 추가하기
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
};

export default OngoingTrip;
