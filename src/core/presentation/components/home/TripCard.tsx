import React from 'react';
import TripThumbnail from './TripThumbnail';
import { useNavigate } from 'react-router-dom';

interface TripCardProps {
  tripId: number;
  tripName: string;
  tripDate: Date | null;
  destination: string;
}

const TripCard: React.FC<TripCardProps> = ({
  tripId,
  tripName,
  tripDate,
  destination,
}) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/trip-detail/${tripId}`);
  };
  return (
    <div
      className="relative w-[148px] h-[148px] flex flex-col items-start gap-[215px] flex-1 self-stretch rounded-xl"
      onClick={handleNavigation}
    >
      <TripThumbnail
        className="flex flex-col items-start self-stretch h-full rounded-xl"
        destination={destination}
      />

      <div className="flex w-[148px] h-[148px] p-3 px-4 flex-col justify-end items-start gap-[215px] absolute">
        <div className="flex flex-col items-start gap-[2px]">
          <h3 className="line-clamp-1 text-white truncate font-pretendard text-sm font-semibold leading-6">
            {tripName}
          </h3>

          <time className="line-clamp-1 overflow-hidden text-white truncate font-pretendard text-sm font-normal leading-5">
            {tripDate
              ? tripDate.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                })
              : ''}
          </time>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
