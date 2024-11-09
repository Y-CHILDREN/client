// UpcomingTrip.tsx

import React from 'react';
// import Jeju from '../../assets/home/Jeju.jpg';
// import LA from '../../assets/home/LA.jpg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TripCard from './TripCard';

interface TripData {
  name: string;
  start_date: string;
  destination: string;
}

interface UpcomingTripProps {
  hasUpcomingTrip: boolean;
  hasPastTrip: boolean;
  upcomingTripData: TripData[];
  pastTripData: TripData[];
}

const UpcomingTrip: React.FC<UpcomingTripProps> = ({
  hasUpcomingTrip,
  hasPastTrip,
  upcomingTripData,
  pastTripData,
}) => {
  return (
    <div>
      <div className="flex px-6 pt-8 pb-4 items-start gap-6 self-stretch"></div>

      <Tabs defaultValue="upcoming" className="mt-8">
        <TabsList className="w-full justify-start border-b bg-transparent p-0">
          <TabsTrigger value="upcoming" className="line-clamp-1">
            다가오는 여행
          </TabsTrigger>
          <TabsTrigger value="past" className="line-clamp-1">
            다녀온 여행
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6">
          {hasUpcomingTrip ? (
            upcomingTripData.map((item) => (
              <TripCard
                tripName={item.name}
                tripDate={new Date(item.start_date)}
                destination={item.destination}
              />
            ))
          ) : (
            <div className="flex h-[148px] p-[50px_48px] flex-col justify-center items-center gap-4 flex-1 rounded-xl border border-dashed border-[#DCDEE0] bg-white">
              <p className="text-muted-foreground">예정된 여행이 없어요.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-6">
          {hasPastTrip ? (
            pastTripData.map((item) => (
              <TripCard
                tripName={item.name}
                tripDate={new Date(item.start_date)}
                destination={item.destination}
              />
            ))
          ) : (
            <div className="flex h-[148px] p-[50px_48px] flex-col justify-center items-center gap-4 flex-1 rounded-xl border border-dashed border-[#DCDEE0] bg-white">
              <p className="text-muted-foreground">다녀온 여행이 없어요.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UpcomingTrip;
