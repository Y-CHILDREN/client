import { useNavigate } from 'react-router-dom';

import TripDetail from '../components/TripDetail.tsx';

export function TripDetailPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/home');
  };

  const handleCreateEvent = () => {
    navigate('/home');
  };

  return <TripDetail onClose={handleClose} onCreateEvent={handleCreateEvent} />;
}