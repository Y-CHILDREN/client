import { useNavigate } from 'react-router-dom';

import TripDetail from '../components/TripDetail/TripDetail.tsx';
import { useUserTripStore } from '@/core/presentation/hooks/stores/userTripStore.ts';

export function TripDetailPage() {
  const navigate = useNavigate();
  const { fetchTrips } = useUserTripStore();

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
  const handleEditTrip = (tripId: number) => {
    navigate(`/trip/${tripId}`);
  };

  const handleDeleteTrip = async (tripId: number) => {
    const confirmDelete = window.confirm('정말로 이 여행을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/trips/${tripId}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error('여행 삭제에 실패했습니다.');
      }

      console.log('여행이 삭제되었습니다.');

      // UI 업데이트 로직 추가
      alert('여행이 성공적으로 삭제되었습니다.');
      navigate('/home'); // 목록 페이지로 이동
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      alert('삭제에 실패했습니다.');
    }

    // 여행정보 리프레쉬
    if (user && user.id) {
      await fetchTrips(user?.id);
    }
  };

  return (
    <TripDetail
      onClose={handleClose}
      onCreateEvent={handleCreateEvent}
      onEditEvent={handleEditEvent}
      onDeleteEvent={handleDeleteEvent}
      onEditTrip={handleEditTrip}
      onDeleteTrip={handleDeleteTrip}
    />
  );
}
