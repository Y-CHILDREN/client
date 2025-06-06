// OngoingTrip.tsx
import React from 'react';
import Beach from '../../assets/home/beach.png';
import { Button } from '@/core/presentation/components/ui/button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TripThumbnail from './TripThumbnail';
import { Trip } from '../../../domain/entities/trip';
import { useUserTripEventStore } from '../../hooks/stores/userTripEventStore';

interface OngoingTripProps {
  hasOngoingTrip: boolean;
  ongoingTripData: Trip;
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
  const navigate = useNavigate();
  const { setSelectedTripId } = useUserTripEventStore();

  const handleNavigation = () => {
    setSelectedTripId(ongoingTripData.id);
    console.log(ongoingTripData.id);
    navigate(`/trip-detail`);
  };
  return (
    <div className="flex items-center self-stretch px-6">
      {/* 진행중인 여행 있는지 여부에 따라 다른 콘텐츠 노출 */}
      {hasOngoingTrip ? (
        <div
          className="relative w-[372px] h-[372px] flex flex-col items-start gap-[215px] flex-1 self-stretch rounded-xl"
          onClick={handleNavigation}
          role="button"
          tabIndex={0}
        >
          <TripThumbnail
            className="flex flex-col items-start self-stretch h-full rounded-xl"
            destination={ongoingTripData.destination}
          />
          <div className="flex flex-col justify-between items-start w-full h-full p-6 bg-gradient-to-b from-transparent from-40% to-black/[0.72] to-100% absolute rounded-xl">
            <div className="flex justify-center items-center py-[6px] px-[10px] rounded-[6px] bg-black/[0.32] text-white">
              <span className="text-sm font-normal leading-5 font-pretendard">
                여행&nbsp;
              </span>
              <span className="text-sm font-semibold leading-5 font-pretendard">
                {dayCount}일차
              </span>
            </div>
            <div className="flex flex-col items-start self-stretch gap-1 text-white">
              <h3 className="overflow-hidden text-lg font-semibold leading-6 text-white truncate line-clamp-1 font-pretendard">
                {ongoingTripData.title}
              </h3>
              <time className="overflow-hidden text-sm font-normal leading-5 text-white truncate line-clamp-1 font-pretendard">
                {new Date(ongoingTripData.start_date).toLocaleDateString(
                  'ko-KR',
                )}
                -
                {new Date(ongoingTripData.end_date).toLocaleDateString('ko-KR')}
              </time>
            </div>
          </div>
        </div>
      ) : (
        // </Link>
        /* 진행중인 콘텐츠 없을 때 */
        <div className="relative w-[327px] h-[327px] p-[32px_24px_24px_24px] flex flex-col items-center gap-4 flex-1 self-stretch rounded-xl bg-[#F5F6F6]">
          <div className="flex flex-col items-center self-stretch flex-1 gap-2">
            <div className="flex flex-col items-center self-stretch flex-1 gap-2">
              <p className="text-base font-semibold leading-6 text-center text-gray-900 font-pretendard">
                누구나 J처럼 <br /> 여행 게획을 만들 수 있어요!
              </p>
            </div>
            <div className="flex items-center justify-center">
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
        </div>
      )}
    </div>
  );
};

export default OngoingTrip;
