// UpcomingTrip.tsx

import React from 'react';
// import Jeju from '../../assets/home/Jeju.jpg';
// import LA from '../../assets/home/LA.jpg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TripCard from './TripCard';

interface UpcomingTripProps {
  hasUpcomingTrip: boolean;
  hasPastTrip: boolean;
}

const UpcomingTrip: React.FC<UpcomingTripProps> = ({
  hasUpcomingTrip,
  hasPastTrip,
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
            data.map((item) => (
              <TripCard
                imageUrl={item.imageUrl}
                tripName={item.tripName}
                tripDate={item.tripDate}
              />
            ))
          ) : (
            <div className="rounded-lg border-2 border-dashed p-8 text-center">
              <p className="text-muted-foreground">예정된 여행이 없어요.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-6">
          {hasPastTrip ? (
            data.map((item) => (
              <TripCard
                imageUrl={item.imageUrl}
                tripName={item.tripName}
                tripDate={item.tripDate}
              />
            ))
          ) : (
            <div className="rounded-lg border-2 border-dashed p-8 text-center">
              <p className="text-muted-foreground">다녀온 여행이 없어요.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UpcomingTrip;
