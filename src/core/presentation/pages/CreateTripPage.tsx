import { useNavigate } from 'react-router-dom';

import CreateTrip from '../components/createTrip/CreateTrip.tsx';
import useTripStore from '../hooks/stores/tripStore.ts';

export function CreateTripPage() {
  const navigate = useNavigate();
  const { resetStep } = useTripStore();

  const handleClose = () => {
    navigate('/home');
    resetStep();
  };

  const handleNavigate = () => {
    // navigate('/detail-trip');
    navigate('/home');
    resetStep();
  };

  return <CreateTrip onClose={handleClose} onSubmit={handleNavigate} />;
}
