import React from 'react';
import { Card } from '@/components/ui/card';
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
    <Card className="flex w-[148px] h-[148px] flex-col items-start self-stretch rounded-xl">
      <TripThumbnail destination={destination} className="object-cover" />
      <div className="flex flex-col">
        <div>{tripName}</div>
        <div>
          {tripDate
            ? tripDate.toLocaleDateString('ko-KR', { month: 'long' })
            : ''}
        </div>
      </div>
    </Card>
  );
};

export default TripCard;
