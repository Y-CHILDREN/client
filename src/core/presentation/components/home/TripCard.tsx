import React from 'react';
import TripThumbnail from './TripThumbnail';

interface TripCardProps {
  tripName: string;
  tripDate: Date | null;
  destination: string;
}

const TripCard: React.FC<TripCardProps> = ({
  tripName,
  tripDate,
  destination,
}) => {
  return (
    // <Card className="flex w-[148px] h-[148px] flex-col items-start self-stretch rounded-xl">
    //   <TripThumbnail destination={destination} className="object-cover" />
    //   <div className="flex flex-col">
    //     <div>{tripName}</div>
    //     <div>
    //       {tripDate
    //         ? tripDate.toLocaleDateString('ko-KR', { month: 'long' })
    //         : ''}
    //     </div>
    //   </div>
    // </Card>

    <div className="relative w-[148px] h-[148px] flex flex-col items-start gap-[215px] flex-1 self-stretch rounded-xl">
      <TripThumbnail
        className="flex flex-col items-start self-stretch h-full rounded-xl"
        destination={destination}
      />
      <div className="absolute flex flex-col justify-between items-start w-full h-full p-6 bg-gradient-to-b from-transparent from-40% to-black/[0.72] to-100% absolute rounded-xl">
        <div className="flex flex-col items-start gap-1 self-stretch text-white">
          <h3 className="line-clamp-1 overflow-hidden text-white truncate font-pretendard text-lg font-semibold leading-6">
            {tripName}
          </h3>
          <time className="line-clamp-1 overflow-hidden text-white truncate font-pretendard text-sm font-normal leading-5">
            {tripDate
              ? tripDate.toLocaleDateString('ko-KR', { month: 'long' })
              : ''}
          </time>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
