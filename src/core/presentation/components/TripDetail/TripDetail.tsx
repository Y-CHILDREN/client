import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Map,
  MoreVertical,
  Plus,
  List,
  Calendar,
  CircleDollarSign,
  ChevronUp,
  ChevronDown,
  Copy,
  Pencil,
  Trash,
} from 'lucide-react';
import { format, isSameDay, parseISO } from 'date-fns';
import Avatar from 'react-avatar';
import { ko } from 'date-fns/locale';

import User from '@/core/domain/entities/user.ts';
import { Event } from '@/core/domain/entities/event.ts';
import { useUserTripStore } from '../../hooks/stores/userTripStore.ts';
import { useUserTripEventStore } from '../../hooks/stores/userTripEventStore';
import { useGoogleMapsStore } from '@/core/presentation/hooks/stores/googleMapsStore.ts';

import EventCardList from '@/core/presentation/components/TripDetail/eventCardList/EventCardList.tsx';
import MapWithMarkers from '@/core/presentation/components/TripDetail/map/MapWithMarkers.tsx';

interface TripDetailProps {
  onClose: () => void;
  onCreateEvent: () => void;
  onEditEvent: (eventId: number) => void;
  onDeleteEvent: (eventId: number) => void;
  onEditTrip: (tripId: number) => void;
  onDeleteTrip: (tripId: number) => void;
}

const TripDetail: React.FC<TripDetailProps> = ({
  onClose,
  onCreateEvent,
  onEditEvent = () => {},
  onDeleteEvent = () => {},
  onEditTrip = () => {},
  onDeleteTrip = () => {},
}) => {
  // 상태 관리
  const {
    selectedTripId, // 선택된 trip_id.
    tripEvents, // 전체 이벤트
    fetchTripEvents, // event 조회.
    updateEventCoordinates, // event에 좌표 추가.
  } = useUserTripEventStore();
  const { getSelectedTripById } = useUserTripStore(); // trip_id로 tripData 조회.

  // tripData
  const tripScheduleData =
    selectedTripId && getSelectedTripById
      ? getSelectedTripById(selectedTripId) // selectedTripId를 이용해 데이터 조회
      : undefined; // selectedTripId가 없으면 undefined

  // 선택 또는 포커싱된 이벤트
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // const [tripEvents, setTripEvents] = useState<Event[]>([
  //   {
  //     event_id: 1,
  //     trip_id: 1,
  //     event_name: '제주도 여행',
  //     location: '제주 제주시 공항로 2',
  //     start_date: new Date('2024-11-01').toISOString(),
  //     end_date: new Date('2024-11-22').toISOString(),
  //     cost: [
  //       { category: '식비', value: 30000 },
  //       { category: '교통비', value: 1500 },
  //     ],
  //     place_image: 'https://placehold.co/400',
  //   },
  //   {
  //     event_id: 2,
  //     trip_id: 1,
  //     event_name: '제주 렌트',
  //     location: '제주 제주시 첨단로 242',
  //     start_date: new Date('2024-11-01').toISOString(),
  //     end_date: new Date('2024-11-22').toISOString(),
  //     cost: [{ category: '식비', value: 50000 }],
  //     place_image: 'https://placehold.co/400',
  //   },
  //   {
  //     event_id: 3,
  //     trip_id: 1,
  //     event_name: '제주도 맛집',
  //     location: '제주 제주시 조천읍 함덕로 40 2층 201호',
  //     start_date: new Date('2024-11-02').toISOString(),
  //     end_date: new Date('2024-11-22').toISOString(),
  //     cost: [{ category: '입장료', value: 10000 }],
  //     place_image: 'https://placehold.co/400',
  //   },
  //   {
  //     event_id: 4,
  //     trip_id: 1,
  //     event_name: '아르떼뮤지엄',
  //     location: '제주특별자치도 제주시 특별자치도, 애월읍 어림비로 478',
  //     start_date: new Date('2024-11-01').toISOString(),
  //     end_date: new Date('2024-11-22').toISOString(),
  //     cost: [{ category: '입장료', value: 17000 }],
  //     place_image: 'https://placehold.co/400',
  //   },
  // ]);

  // 비용 합계 계산
  const totalCost = tripEvents.reduce((acc, event) => {
    return acc + event.cost.reduce((sum, costItem) => sum + costItem.value, 0);
  }, 0);

  // 멤버
  const members: User[] = [
    {
      id: '2',
      provider: 'naver',
      email: 'ghkdwodnjs@naver.com',
      user_image:
        'https://lh3.googleusercontent.com/a/ACg8ocKji1Y0dBDA_LJG3YzZfstynUfR2qtPS8_qJmtZ_9FkXA79NSNw=s96-c',
      nickname: 'Wanny',
      user_memo: '',
      access_token:
        'ya29.a0AcM612wBL-gtSO5PMhPl_LoP6IQJ4OdzylLRmjTP76xOr3xVpVrbJ6yQH1Q1ti2YKnLAH7e0vl3SRJslSj-b_o38aU3xij-1UQ3nJAQnMBAcvp0GlwvSapLjdbKqdp4aYgCBctmu_6JtHteZR_Ha3VGJTfIGnel2sO_mBrN_aCgYKARgSARASFQHGX2MiTmev-n8gPEZQ3Z4DbT2F0g0175',
      refresh_token:
        '1//0eQqQoREMmFDECgYIARAAGA4SNwF-L9IrwrGe1Tsdl-t_WShiOaukjX4gYj2zyfpy5sXaQfUujnjnSECa6yF6DBXWOr97wJhl1uY',
      trip_history: [1],
    },
    {
      id: '3',
      provider: 'naver',
      email: 'ghkdwodnjs123@naver.com',
      user_image:
        'https://lh3.googleusercontent.com/a/ACg8ocKji1Y0dBDA_LJG3YzZfstynUfR2qtPS8_qJmtZ_9FkXA79NSNw=s96-c',
      nickname: 'Wanny123',
      user_memo: '',
      access_token:
        'ya29.a0AcM612wBL-gtSO5PMhPl_LoP6IQJ4OdzylLRmjTP76xOr3xVpVrbJ6yQH1Q1ti2YKnLAH7e0vl3SRJslSj-b_o38aU3xij-1UQ3nJAQnMBAcvp0GlwvSapLjdbKqdp4aYgCBctmu_6JtHteZR_Ha3VGJTfIGnel2sO_mBrN_aCgYKARgSARASFQHGX2MiTmev-n8gPEZQ3Z4DbT2F0g0175',
      refresh_token:
        '1//0eQqQoREMmFDECgYIARAAGA4SNwF-L9IrwrGe1Tsdl-t_WShiOaukjX4gYj2zyfpy5sXaQfUujnjnSECa6yF6DBXWOr97wJhl1uY',
      trip_history: [1],
    },
    {
      id: '4',
      provider: 'google',
      email: 'kt44800325@gmail.com',
      user_image:
        'https://lh3.googleusercontent.com/a/ACg8ocKji1Y0dBDA_LJG3YzZfstynUfR2qtPS8_qJmtZ_9FkXA79NSNw=s96-c',
      nickname: '오니',
      user_memo: '',
      access_token:
        'ya29.a0AeDClZATQawfEtSOFBuLyj7BT9_-M08opxchQyiG2Txon7g2QeTqs8oCmSF7yvM-I4k6WBEXkbOn_a9uxDOPk_2rA1B4U8bzhWtzHY0Nksm2RxFLEp5sVTRIIVtwA9X8yq9MtU0KDgSEa2fbPw291lNY7vY3eovFs6K1dZDOaCgYKAV0SARESFQHGX2MiiiZY27UlPJgpQdO8D0Racw0175',
      refresh_token:
        '1//0e-1UcIDy2ik0CgYIARAAGA4SNwF-L9IrQjKLMVENaGMaSrpTfZRZWhiZCMn19K1p9HsAGqGHhoNrS9UYHS_7Q8fTR9AceoOyXJ0',
      trip_history: [1],
    },
    {
      id: '5',
      provider: 'naver',
      email: 'pack@naver.com',
      user_image:
        'https://lh3.googleusercontent.com/a/ACg8ocKji1Y0dBDA_LJG3YzZfstynUfR2qtPS8_qJmtZ_9FkXA79NSNw=s96-c',
      nickname: 'Rodaju',
      user_memo: '',
      access_token:
        'ya29.a0AcM612wBL-gtSO5PMhPl_LoP6IQJ4OdzylLRmjTP76xOr3xVpVrbJ6yQH1Q1ti2YKnLAH7e0vl3SRJslSj-b_o38aU3xij-1UQ3nJAQnMBAcvp0GlwvSapLjdbKqdp4aYgCBctmu_6JtHteZR_Ha3VGJTfIGnel2sO_mBrN_aCgYKARgSARASFQHGX2MiTmev-n8gPEZQ3Z4DbT2F0g0175',
      refresh_token:
        '1//0eQqQoREMmFDECgYIARAAGA4SNwF-L9IrwrGe1Tsdl-t_WShiOaukjX4gYj2zyfpy5sXaQfUujnjnSECa6yF6DBXWOr97wJhl1uY',
      trip_history: [1],
    },
  ];

  // tripSchedule.members 와 members에서 일치하는 멤버 필터링
  const filteredMembers = tripScheduleData
    ? members.filter((member) =>
        tripScheduleData.members.includes(member.email),
      )
    : [];

  // 날짜 선택
  const [selectedDate, setSelectedDate] = useState(
    tripScheduleData ? new Date(tripScheduleData.start_date) : new Date(),
  );

  const startDate = tripScheduleData
    ? parseISO(tripScheduleData.start_date)
    : new Date();
  const endDate = tripScheduleData
    ? parseISO(tripScheduleData.end_date)
    : new Date();

  // 날짜 선택 버튼 생성
  const dateOptions = [];
  const currentDate = startDate;
  while (currentDate <= endDate) {
    dateOptions.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // 선택한 날짜에 대한 이벤트 목록 필터링
  const eventForSelectedDate = tripEvents.filter((event) =>
    selectedDate ? isSameDay(parseISO(event.start_date), selectedDate) : false,
  );

  // Map (Google Map api)
  // 지도 표시 여부
  const [showMap, setShowMap] = useState(false);

  const { isLoaded } = useGoogleMapsStore();

  // 이벤트 목록 드롭다운.
  const [expandedEvents, setExpandedEvents] = useState<number[]>([]);

  // toast 팝업.
  // 토스트 타입 정의
  type Toast = { message: string; type: 'success' | 'error' };
  const [toast, setToast] = useState<Toast | null>(null);

  // 드롭다운 버튼 (MoreVertical)
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRefMoreVertical = useRef<HTMLDivElement>(null);

  // 핸들러
  // 맵, 리스트 전환 버튼 핸들러
  const handleMapToggle = () => {
    setShowMap(!showMap);
  };

  // 닫기 버튼 핸들러
  const handleClose = () => {
    onClose();
  };

  // 이벤트 생성 버튼 핸들러
  const handleCreateEvent = () => {
    onCreateEvent();
  };

  // 리스트 확장 버튼 핸들러
  const handleExpandEvent = (eventId: number) => {
    setExpandedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId],
    );
  };

  // 주소 복사 버튼 핸들러
  const handleCopyAddress = async (address: string) => {
    if (!navigator.clipboard) {
      setToast({ message: '클립보드 API를 지원하지 않습니다.', type: 'error' });
      return;
    }

    try {
      await navigator.clipboard.writeText(address);
      setToast({ message: '주소가 복사되었습니다.', type: 'success' });
    } catch (error) {
      console.error('Copy failed:', error);
      setToast({ message: '주소 복사에 실패했습니다.', type: 'error' });
    }
  };

  // 페이지 로드 시 이벤트 데이터 조회
  useEffect(() => {
    if (selectedTripId) {
      fetchTripEvents(selectedTripId);
    }
  }, []);

  // tripEvent에 위치 정보를 추가하는 로직
  useEffect(() => {
    const fetchAndUpdateEvents = async () => {
      try {
        if (selectedTripId) {
          await fetchTripEvents(selectedTripId); // 이벤트 데이터 가져오기
          await updateEventCoordinates(); // 좌표 업데이트
        }
      } catch (error) {
        console.error('데이터 처리 중 오류:', error);
      }
    };

    fetchAndUpdateEvents();
  }, [selectedTripId]);

  // 토스트 팝업 노출 시간
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // 추가 기능 버튼 외부 클릭시 닫기.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRefMoreVertical.current &&
        !dropdownRefMoreVertical.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // logging
  useEffect(() => {
    // console.log('tripScheduleData:', tripScheduleData);
    // console.log('tripEvents:', tripEvents);
    // console.log('showMap:', showMap);
    // console.log('Filtered Members:', filteredMembers);
    // console.log('eventForSelectedDate', eventForSelectedDate);
    // console.log('selectedEvent', selectedEvent);
  }, [tripScheduleData, tripEvents, showMap]);

  return (
    <div className="flex flex-col w-full h-full bg-white min-h-[600px] relative">
      {/*tripScheduleData 없으면 메시지 출력*/}
      {!tripScheduleData ? (
        <p>선택된 여행 데이터를 찾을 수 없습니다.</p>
      ) : (
        <>
          {/* 헤더 */}
          <header className="px-4 space-y-4">
            {/* 닫기, 지도, 추가기능 버튼 */}
            <div className="flex justify-between items-center pt-2 relative">
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
              <div
                className="flex items-center gap-4"
                ref={dropdownRefMoreVertical}
              >
                {/* 맵 버튼 */}
                <button onClick={handleMapToggle} className="bg-white">
                  {showMap ? (
                    <List className="h-6 w-6" />
                  ) : (
                    <Map className="h-6 w-6" />
                  )}
                </button>

                {/* 추가기능 버튼 */}
                <button
                  className="bg-white"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <MoreVertical className="h-6 w-6" />
                </button>
                {showDropdown && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <button
                      onClick={() => {
                        onEditTrip(selectedTripId!);
                        setShowDropdown(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      수정
                    </button>
                    <button
                      onClick={() => {
                        onDeleteTrip(selectedTripId!);
                        setShowDropdown(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      삭제
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-3">
              {/* 제목 */}
              <h1 className="text-2xl font-bold">{tripScheduleData.title}</h1>

              <div className="flex items-center justify-between text-sm text-gray-600 py-3">
                {/* 날짜, 경비 */}
                <div className="flex flex-col items-center space-y-3">
                  <span className="flex items-center mr-auto">
                    <Calendar className="mr-2" />
                    {format(
                      parseISO(tripScheduleData.start_date),
                      'yyyy. MM. dd',
                      {
                        locale: ko,
                      },
                    )}{' '}
                    -{' '}
                    {format(
                      parseISO(tripScheduleData.end_date),
                      'yyyy. MM. dd',
                      {
                        locale: ko,
                      },
                    )}
                  </span>
                  <span className="flex items-center mr-auto">
                    <CircleDollarSign className="mr-2" />{' '}
                    <strong>{totalCost} 원</strong>
                  </span>
                </div>

                {/* 멤버 아바타 */}
                <div className="flex -space-x-2">
                  {filteredMembers.slice(0, 3).map((member, index) => (
                    <Avatar
                      key={member.id}
                      name={member.nickname}
                      src={member.user_image}
                      size="32"
                      round
                      color={`hsl(${index * 60}, 70%, 85%)`}
                    />
                  ))}
                  {filteredMembers.length > 3 && (
                    <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-sm text-gray-600">
                      +{filteredMembers.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/*  날짜 선택 탭 */}
          <nav className="border-y border-gray-200">
            <div className="flex overflow-x-auto hide-scrollbar">
              {dateOptions.map((date) => (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-1 min-w-[100px] py-3 px-4 text-center relative bg-white focus:outline-none
                ${isSameDay(selectedDate, date) ? 'text-black' : 'text-gray-400'}`}
                >
                  <div className="text-[15px]">
                    {format(date, 'MM. dd', { locale: ko })}
                  </div>
                  <div className="text-xs">
                    ({format(date, 'EEE', { locale: ko })})
                  </div>
                  {isSameDay(selectedDate, date) && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* 이벤트 목록 */}
          <main className="flex-1 relative">
            {showMap ? (
              isLoaded ? (
                <MapWithMarkers
                  events={eventForSelectedDate}
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  selectedEvent={selectedEvent}
                  setSelectedEvent={setSelectedEvent}
                />
              ) : (
                <div>Loading map...</div>
              )
            ) : eventForSelectedDate.length > 0 ? (
              <div className="flex flex-col gap-3 p-4 mb-10 bg-gray-50">
                {eventForSelectedDate.map((event, index) => (
                  <div key={event.event_id} className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3ACC97] text-white">
                          {index + 1}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          {format(event.start_date, 'HH:mm', { locale: ko })}
                        </div>
                      </div>
                      <div className="flex-1 space-y-2 justify-between border border-gray-200 rounded-lg shadow-lg p-3 px-5">
                        <div className="flex flex-row justify-between items-center">
                          <div className="flex flex-col items-start">
                            <div className="font-medium">
                              {event.event_name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {event.location.split(' ').slice(0, 2).join(' ')}{' '}
                              ·{' '}
                              {event.cost
                                .reduce((sum, item) => sum + item.value, 0)
                                .toLocaleString()}{' '}
                              원
                            </div>
                          </div>
                          <button
                            className="p-4"
                            onClick={() => handleExpandEvent(event.event_id)}
                          >
                            {expandedEvents.includes(event.event_id) ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                        {expandedEvents.includes(event.event_id) && (
                          <div className=" pb-1">
                            <div className="pt-1 border-t border-gray-100">
                              <div className="flex justify-items-start items-center mb-2.5 text-gray-600 text-sm">
                                <span>{event.location}</span>
                                <button
                                  className="p-2 hover:bg-gray-100 rounded-lg"
                                  onClick={() =>
                                    handleCopyAddress(event.location)
                                  }
                                >
                                  <Copy className="w-4 h-4 text-gray-400" />
                                </button>
                              </div>
                              <div className="flex gap-3">
                                <button
                                  className="flex-1 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
                                  onClick={() => onEditEvent(event.event_id)}
                                >
                                  수정
                                </button>
                                <button
                                  className="flex-1 py-3 border border-red-200 rounded-lg hover:bg-red-50 text-red-500 text-sm"
                                  onClick={() => onDeleteEvent(event.event_id)}
                                >
                                  삭제
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4">일정을 추가해 주세요</p>
            )}

            {/* 이벤트 추가 버튼 */}
            <div
              className={`absolute right-4 ${showMap ? 'top-4' : 'bottom-8'}`}
            >
              <button
                onClick={handleCreateEvent}
                className="bg-[#3ACC97] hover:bg-[#7fceb0] text-white rounded-full px-6 py-3 shadow-lg flex items-center justify-center transition-colors duration-200 focus:outline-none"
              >
                <Plus className="h-5 w-5 mr-2" />
                이벤트 추가
              </button>
            </div>

            {/* 하단 이벤트 목록 카드 */}
            {showMap && (
              <div className="absolute bottom-0 left-0 right-0">
                <EventCardList
                  selectedDate={selectedDate}
                  events={eventForSelectedDate}
                  selectedEvent={selectedEvent!}
                  setSelectedEvent={setSelectedEvent}
                  onEditEvent={onEditEvent}
                  onDeleteEvent={onDeleteEvent}
                />
              </div>
            )}
          </main>

          {/* Toast Notification */}
          {toast && (
            <div
              className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg ${
                toast.type === 'success'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {toast.message}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TripDetail;