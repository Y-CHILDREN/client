import { useNavigate } from 'react-router-dom';

import TripDetail from '../components/TripDetail/TripDetail.tsx';

export function TripDetailPage() {
  const navigate = useNavigate();

  // 닫기 핸들러: 홈 화면으로 이동
  const handleClose = () => {
    navigate('/home');
  };

  // 이벤트 생성 핸들러: 이벤트 생성 화면으로 이동
  const handleCreateEvent = () => {
    navigate('/add-event');
  };

  // 이벤트 수정 핸들러: event_id 이벤트에 해당하는 수정 화면으로 이동
  const handleEditEvent = (eventId: number) => {
    console.log('navigate event-edit', eventId);
    navigate(`/edit-event/${eventId}`);
  };

  // 이벤트 삭제 핸들러: 특정 이벤트 삭제.
  const handleDeleteEvent = (eventId: number) => {
    // 삭제 요청(삭제 API 호출)
    console.log(`Deleting event with ID: ${eventId}`);
    alert(`이벤트 ${eventId}가 삭제되었습니다.`);
  };

  return (
    <TripDetail
      onClose={handleClose}
      onCreateEvent={handleCreateEvent}
      onEditEvent={handleEditEvent}
      onDeleteEvent={handleDeleteEvent}
    />
  );
}
