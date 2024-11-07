// OngoingTrip.tsx
import React from 'react';
import LA from '../../assets/home/LA.jpg';
import Beach from '../../assets/home/Beach.png';
import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Link } from 'react-router-dom';

interface OngoingTripProps {
  hasOngoingTrip: boolean;
  tripName: string;
  tripDate: Date | null;
}

const OngoingTrip: React.FC<OngoingTripProps> = ({
  hasOngoingTrip,
  tripName,
  tripDate,
}) => {
  const dayCount = tripDate
    ? Math.ceil(
        (new Date().getTime() - tripDate.getTime()) / (1000 * 60 * 60 * 24),
      )
    : 0;
  return (
    <div className="flex px-6 items-center self-stretch">
      {hasOngoingTrip ? (
        <Card className="flex w-[327px] h-[327px] p-0 flex-col justify-between items-start">
          <img className="rounded-xl w-full h-full" src={LA} alt="test" />
          {/* 여행 시작 전이면 버튼 표시 안하게끔 함 */}
          {dayCount > 0 && (
            <button className="absolute top-0 right-0">
              여행 {dayCount} 일차
            </button>
          )}
          <div className="flex flex-col">
            <div>{tripName}</div>
            <div>{tripDate ? tripDate.toLocaleDateString() : ''}</div>
          </div>
        </Card>
      ) : (
        /* Main Content */
        <Card className="flex flex-col items-center p-8 text-center">
          <p className="mb-2 text-lg font-medium">누구나 J처럼</p>
          <p className="mb-6 text-lg font-medium">
            여행 계획을 만들 수 있어요!
          </p>
          <img
            className="w-[148px] h-[148px] bg-[url('/path-to-image')] bg-lightgray bg-center bg-cover bg-no-repeat"
            src={Beach}
            alt="test"
          />
          <Link to="/create-trip">
            <Button
              className="w-full bg-gray-700 text-white hover:bg-gray-800"
              size="lg"
            >
              여행 추가하기
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
};

export default OngoingTrip;
