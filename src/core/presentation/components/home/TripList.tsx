import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/core/presentation/components/ui/tabs';
import TripCard from './TripCard';
import { Trip } from '../../../domain/entities/trip';

interface TripListProps {
  hasUpcomingTrip: boolean;
  hasPastTrip: boolean;
  upcomingTripData: Trip[];
  pastTripData: Trip[];
}

const TripList: React.FC<TripListProps> = ({
  hasUpcomingTrip,
  hasPastTrip,
  upcomingTripData,
  pastTripData,
}) => {
  return (
    <div>
      <Tabs defaultValue="upcoming">
        <TabsList className="flex px-6 pt-8 pb-4 items-start gap-6 self-stretch">
          <TabsTrigger
            value="upcoming"
            className="group px-0 line-clamp-1 bg-transparent overflow-hidden text-[#AAADB0] data-[state=active]:text-[#151616] truncate focus:whitespace-normal font-pretendard text-base font-semibold leading-6"
          >
            <span>다가오는 여행</span>
            <div className="relative w-full flex justify-center">
              <div className="w-[4px] h-[4px] rounded-full bg-transparent group-data-[state=active]:bg-black focus-visible:outline-none border-none hover-none" />
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="group px-0 line-clamp-1 bg-transparent overflow-hidden text-[#AAADB0] data-[state=active]:text-[#151616] truncate focus:whitespace-normal font-pretendard text-base font-semibold leading-6"
          >
            <span>다녀온 여행</span>
            <div className="relative w-full flex justify-center">
              <div className="w-[4px] h-[4px] rounded-full bg-transparent group-data-[state=active]:bg-black" />
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {hasUpcomingTrip ? (
            <div className="flex flex-row pl-6 items-start gap-3 self-stretch overflow-x-auto">
              {upcomingTripData.map((item) => (
                <div>
                  <TripCard
                    key={item.id}
                    tripName={item.title}
                    tripDate={new Date(item.start_date)}
                    destination={item.destination}
                    tripId={item.id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex px-6 justify-center items-center gap-3 flex-1">
              <div className="flex h-[148px] p-[50px_48px] flex-col justify-center items-center gap-4 flex-1 rounded-xl border border-dashed border-[#DCDEE0] bg-white">
                <p className="text-[#545759] text-center font-pretendard text-sm font-normal leading-5">
                  예정된 여행이 없어요.
                </p>
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="past">
          {hasPastTrip ? (
            <div className="flex flex-row pl-6 box-border items-start gap-3 self-stretch overflow-hidden">
              {pastTripData.map((item) => (
                <div>
                  <TripCard
                    key={item.id}
                    tripId={item.id}
                    tripName={item.title}
                    tripDate={new Date(item.start_date)}
                    destination={item.destination}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex px-6 justify-centeritems-center gap-3 flex-1">
              <div className="flex h-[148px] p-[50px_48px] flex-col justify-center items-center gap-4 flex-1 rounded-xl border border-dashed border-[#DCDEE0] bg-white">
                <p className="text-[#545759] text-center font-pretendard text-sm font-normal leading-5">
                  다녀온 여행이 없어요.
                </p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TripList;
