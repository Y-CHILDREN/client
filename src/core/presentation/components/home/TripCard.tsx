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
    // //ongoing
    //     <Link to={`/trip/${ongoingTripData.id}`}>
    //     {/* 카드*/}
    //     <div className="relative w-[372px] h-[372px] flex flex-col items-start gap-[215px] flex-1 self-stretch rounded-xl">
    //       <TripThumbnail
    //         className="flex flex-col items-start self-stretch h-full rounded-xl"
    //         destination={ongoingTripData.destination}
    //       />
    //       <div className="absolute flex flex-col justify-between items-start w-full h-full p-6 bg-gradient-to-b from-transparent from-40% to-black/[0.72] to-100% absolute rounded-xl">
    //         <div className="flex justify-center items-center py-[6px] px-[10px] rounded-[6px] bg-black/[0.32] text-white">
    //           <span className="font-pretendard text-sm font-normal leading-5">
    //             여행&nbsp;
    //           </span>
    //           <span className="font-pretendard text-sm font-semibold leading-5">
    //             {dayCount}일차
    //           </span>
    //         </div>
    //         <div className="flex flex-col items-start gap-1 self-stretch text-white">
    //           <h3 className="line-clamp-1 overflow-hidden text-white truncate font-pretendard text-lg font-semibold leading-6">
    //             {ongoingTripData.name}
    //           </h3>
    //           <time className="line-clamp-1 overflow-hidden text-white truncate font-pretendard text-sm font-normal leading-5">
    //             {new Date(ongoingTripData.start_date).toLocaleDateString(
    //               'ko-KR',
    //             )}
    //             -
    //             {new Date(ongoingTripData.end_date).toLocaleDateString(
    //               'ko-KR',
    //             )}
    //           </time>
    //         </div>
    //       </div>
    //     </div>
    //   </Link>

    //editing

    <div className="relative w-[148px] h-[148px] flex flex-col items-start gap-[215px] flex-1 self-stretch rounded-xl">
      <TripThumbnail
        className="flex flex-col items-start self-stretch h-full rounded-xl"
        destination={destination}
      />

      <div className="flex w-[148px] h-[148px] p-3 px-4 flex-col justify-end items-start gap-[215px] absolute bg-black">
        <div className="flex flex-col items-start gap-[2px]">
          <h3 className="line-clamp-1 overflow-hidden text-white truncate font-pretendard text-lg font-semibold leading-6">
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
