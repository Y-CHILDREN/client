import { useNavigate } from 'react-router-dom';

import CreateTrip from '../components/createTrip/CreateTrip.tsx';

export function CreateTripPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/home');
  };

  return <CreateTrip onClose={handleClose} />;
}
