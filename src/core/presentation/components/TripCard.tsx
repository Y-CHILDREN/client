import { Trip } from '../../domain/entities/trip';
import { useUserTripStore } from '../hooks/stores/userTripStore';
import { useUserTripEventStore } from '../hooks/stores/userTripEventStore';
import { useNavigate } from 'react-router-dom';
import TripThumbnail from './home/TripThumbnail';
interface TripCardProps {
  trip: Trip;
}
const TripCard = ({ trip }: TripCardProps) => {
  const navigate = useNavigate();
  const { getDday } = useUserTripStore();
  const { setSelectedTripId } = useUserTripEventStore();

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const handleNavigation = () => {
    setSelectedTripId(trip.id);
    navigate(`/trip-detail`);
  };

  return (
    <div
      className="flex items-center self-stretch gap-5 p-4 rounded-xl bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.04),0px_0px_4px_0px_rgba(0,0,0,0.04)] hover:cursor-pointer"
      onClick={handleNavigation}
    >
      <div className="relative w-[72px] h-[72px] overflow-hidden rounded-xl">
        <TripThumbnail
          destination={trip.destination}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-[6px] flex-1 ">
        <div className="flex items-center self-stretch gap-2">
          <span className="max-w-[200px] overflow-hidden text-black  whitespace-nowrap text-ellipsis">
            {trip.title}
          </span>
          <span
            className={`line-clamp-1 font-bold ${
              getDday(trip) === '여행중'
                ? 'text-[#0066FF]'
                : getDday(trip).startsWith('-')
                  ? 'text-[#FF8A00]'
                  : 'text-[#3ACC97]'
            }`}
          >
            {getDday(trip) === '여행중' ? getDday(trip) : `D${getDday(trip)}`}
          </span>
        </div>
        <div>
          <div className="flex-1 line-clamp-1 text-[#737678]">
            {formatDate(trip.start_date)} ~{formatDate(trip.end_date)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
