import React from 'react';
import { Link } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/core/presentation/components/ui/tabs';
import TripCard from './TripCard';

interface TripData {
  name: string;
  start_date: string;
  destination: string;
  id: number;
}

interface TripListProps {
  hasUpcomingTrip: boolean;
  hasPastTrip: boolean;
  upcomingTripData: TripData[];
  pastTripData: TripData[];
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
            className="px-0 line-clamp-1 bg-transparent overflow-hidden text-[#AAADB0] focus:text-[#151616] truncate focus:whitespace-normal font-pretendard text-base font-semibold leading-6"
          >
            다가오는 여행
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="px-0 line-clamp-1 bg-transparent overflow-hidden text-[#AAADB0] focus:text-[#151616] truncate focus:whitespace-normal font-pretendard text-base font-semibold leading-6"
          >
            다녀온 여행
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6">
          <div className="flex px-6 justify-center items-center gap-3 flex-1">
            <div className="flex h-[148px] p-[50px_48px] flex-col justify-center items-center gap-4 flex-1 rounded-xl border border-dashed border-[#DCDEE0] bg-white">
              <p className="text-[#545759] text-center font-pretendard text-sm font-normal leading-5">
                예정된 여행이 없어요.
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="past" className="mt-6">
          {hasPastTrip ? (
            <div className="flex flex-row pl-6 items-start gap-3 self-stretch">
              {pastTripData.map((item) => (
                <Link to={`/trip/${item.id}`}>
                  <TripCard
                    tripName={item.name}
                    tripDate={new Date(item.start_date)}
                    destination={item.destination}
                  />
                </Link>
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