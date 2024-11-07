import React from 'react';
import { Card } from '@/components/ui/card';

interface TripCardProps {
  imageUrl: string;
  tripName: string;
  tripDate: Date | null;
}

const TripCard: React.FC<TripCardProps> = ({
  imageUrl,
  tripName,
  tripDate,
}) => {
  return (
    <Card className="flex w-[327px] h-[327px] p-0 flex-col justify-between items-start">
      name = {tripName}
      img = {imageUrl}
      <img className="rounded-xl w-full h-full" src={imageUrl} alt={tripName} />
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
