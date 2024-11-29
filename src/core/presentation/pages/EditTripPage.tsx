import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CreatedTrip } from '../../domain/entities/trip.ts';
import { useUserTripEventStore } from '@/core/presentation/hooks/stores/userTripEventStore.ts';
import { useUserTripStore } from '@/core/presentation/hooks/stores/userTripStore.ts';

import EditTrip from '@/core/presentation/components/EditTrip/EditTrip.tsx';
import useTripStore from '@/core/presentation/hooks/stores/tripStore.ts';

export function EditTripPage() {
  const { tripId } = useParams<{ tripId: string }>();
  // const [trip, setTrip] = useState<Trip | null>(null);
  const navigate = useNavigate();

  // TripData 상태관리
  const { selectedTripId } = useUserTripEventStore();
  const { getSelectedTripById } = useUserTripStore();
  const trip = getSelectedTripById(selectedTripId!);
  const { resetStep } = useTripStore();

  // logging
  useEffect(() => {
    console.log('selectedTripId', selectedTripId);
    console.log('trip', trip);
  }, []);

  // 수정하기 핸들러
  const handleTripUpdate = async (updatedTrip: CreatedTrip) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/trips/${tripId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTrip),
        },
      );
      if (!response.ok) throw new Error('Failed to update trip');
      navigate('/trip-detail');
      resetStep();
    } catch (error) {
      console.error('Error updating trip', error);
    }
  };

  // 닫기 핸들러
  const handleClose = () => {
    navigate('/detail-trip');
    resetStep();
  };

  return (
    <EditTrip trip={trip!} onUpdate={handleTripUpdate} onClose={handleClose} />
  );
}
