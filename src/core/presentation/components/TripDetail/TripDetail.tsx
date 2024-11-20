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

import { Trip } from '@/core/domain/entities/trip.ts';
import User from '@/core/domain/entities/user.ts';

import EventCardList from '@/core/presentation/components/TripDetail/eventCardList/EventCardList.tsx';
import MapWithMarkers from '@/core/presentation/components/TripDetail/map/MapWithMarkers.tsx';
import { useGoogleMapsStore } from '@/core/presentation/hooks/stores/googleMapsStore.ts';

interface Cost {
  category: string;
  cost: number;
}

interface TripEvent {
  trip_event_id: number;
  trip_id: number;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  cost: Cost[];
  latitude?: number;
  longitude?: number;
  place_image?: string;
}

interface TripDetailProps {
  onClose: () => void;
  onCreateEvent: () => void;
  onEditEvent: (eventId: number) => void;
  onDeleteEvent: (eventId: number) => void;
}

const TripDetail: React.FC<TripDetailProps> = ({
  onClose,
  onCreateEvent,
  onEditEvent = () => {},
  onDeleteEvent = () => {},
}) => {
  // 상태 관리
  const tripScheduleData: Trip = {
    id: 1,
    title: '제주도 여행',
    destination: '제주도 서귀포시',
    start_date: new Date('2024-10-16').toISOString(),
    end_date: new Date('2024-10-30').toISOString(),
    members: [
      'kt44800325@gmail.com',
      'ghkdwodnjs123@naver.com',
      'ghkdwodnjs@naver.com',
      'pack@naver.com',
    ],
    created_by: 'kt44800325@gmail.com',
  };

  // tripEvents
  const [selectedEvent, setSelectedEvent] = useState<TripEvent | null>(null);
  const [tripEvents, setTripEvents] = useState<TripEvent[]>([
    {
      trip_event_id: 1,
      trip_id: 1,
      title: '제주도 여행',
      destination: '제주 제주시 공항로 2',
      start_date: new Date('2024-10-16').toISOString(),
      end_date: new Date('2024-10-18').toISOString(),
      cost: [
        { category: '식비', cost: 30000 },
        { category: '교통비', cost: 1500 },
      ],
      place_image: 'https://placehold.co/400',
    },
    {
      trip_event_id: 2,
      trip_id: 1,
      title: '제주 렌트',
      destination: '제주 제주시 첨단로 242',
      start_date: new Date('2024-10-16').toISOString(),
      end_date: new Date('2024-10-19').toISOString(),
      cost: [{ category: '식비', cost: 50000 }],
      place_image: 'https://placehold.co/400',
    },
    {
      trip_event_id: 3,
      trip_id: 1,
      title: '제주도 맛집',
      destination: '제주 제주시 조천읍 함덕로 40 2층 201호',
      start_date: new Date('2024-10-17').toISOString(),
      end_date: new Date('2024-10-17').toISOString(),
      cost: [{ category: '입장료', cost: 10000 }],
      place_image: 'https://placehold.co/400',
    },
    {
      trip_event_id: 4,
      trip_id: 1,
      title: '아르떼뮤지엄',
      destination: '제주특별자치도 제주시 특별자치도, 애월읍 어림비로 478',
      start_date: new Date('2024-10-16').toISOString(),
      end_date: new Date('2024-10-16').toISOString(),
      cost: [{ category: '입장료', cost: 17000 }],
      place_image: 'https://placehold.co/400',
    },
  ]);

  // 비용 합계 계산
  const totalCost = tripEvents.reduce((acc, event) => {
    return acc + event.cost.reduce((sum, costItem) => sum + costItem.cost, 0);
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
  const filteredMembers = members.filter((member) =>
    tripScheduleData.members.includes(member.email),
  );

  // 날짜 선택
  const [selectedDate, setSelectedDate] = useState(
    new Date(tripScheduleData.start_date),
  );

  const startDate = parseISO(tripScheduleData.start_date);
  const endDate = parseISO(tripScheduleData.end_date);

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

  // 지도 옵션 설정
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  // 지도 표시 위치
  const mapCenter = selectedEvent
    ? { lat: selectedEvent.latitude!, lng: selectedEvent.longitude! }
    : { lat: 33.3617, lng: 126.5292 };

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

  // useEffect
  // 토스트 팝업 노출 시간
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // tripEvent에 위치 정보를 추가하는 로직
  useEffect(() => {
    if (isLoaded) {
      const geocoder = new window.google.maps.Geocoder();

      // 좌표 없는 이벤트 목록
      const eventsWithoutCoordinates = tripEvents.filter(
        (event) =>
          event.latitude === undefined || event.longitude === undefined,
      );

      if (eventsWithoutCoordinates.length > 0) {
        const updatedEventsPromises = eventsWithoutCoordinates.map((event) => {
          return new Promise<TripEvent>((resolve) => {
            geocoder.geocode(
              { address: event.destination },
              (result, status) => {
                if (result === null) {
                  return console.log('result is null');
                }

                // result에 값이 존재하는지 확인
                if (status === 'OK' && result[0]) {
                  const { lat, lng } = result[0].geometry.location;
                  resolve({
                    ...event,
                    latitude: lat(),
                    longitude: lng(),
                  });
                } else {
                  console.error(
                    `Geocoding failed for ${event.destination}: `,
                    status,
                  );
                  resolve(event); // 실패 시 원래 이벤트 반환
                }
              },
            );
          });
        });

        // 모든 Geocoding 작업이 완료되면 상태 업데이트
        Promise.all(updatedEventsPromises).then((updatedEvents) => {
          setTripEvents((prevEvents) =>
            prevEvents.map(
              (prevEvent) =>
                updatedEvents.find(
                  (e) => e.trip_event_id === prevEvent.trip_event_id,
                ) || prevEvent,
            ),
          );
        });
      }
    }
  }, [isLoaded, tripEvents]);

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
    // console.log('Filtered Members:', filteredMembers);
    console.log('eventForSelectedDate', eventForSelectedDate);
  }, [eventForSelectedDate]);

  return (
    <div className="flex flex-col w-full h-full bg-white min-h-[600px] relative">
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
                    // onEditTrip();
                    setShowDropdown(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  수정
                </button>
                <button
                  onClick={() => {
                    // onDeleteTrip();
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
                {format(parseISO(tripScheduleData.start_date), 'yyyy. MM. dd', {
                  locale: ko,
                })}{' '}
                -{' '}
                {format(parseISO(tripScheduleData.end_date), 'yyyy. MM. dd', {
                  locale: ko,
                })}
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
              mapCenter={mapCenter}
              mapContainerStyle={mapContainerStyle}
              setSelectedEvent={setSelectedEvent}
            />
          ) : (
            <div>Loading map...</div>
          )
        ) : eventForSelectedDate.length > 0 ? (
          <div className="flex flex-col gap-3 p-4 bg-gray-50">
            {eventForSelectedDate.map((event, index) => (
              <div key={event.trip_event_id} className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3ACC97] text-white">
                      {index + 1}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {format(event.start_date, 'HH:mm', { locale: ko })}
                    </div>
                  </div>
                  <div className="flex-1 space-y-2 justify-between border border-gray-200 rounded-lg shadow-lg p-3">
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-col items-start">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-gray-600">
                          {event.destination.split(' ').slice(0, 2).join(' ')} ·{' '}
                          {event.cost
                            .reduce((sum, item) => sum + item.cost, 0)
                            .toLocaleString()}{' '}
                          원
                        </div>
                      </div>
                      <button
                        className="p-4"
                        onClick={() => handleExpandEvent(event.trip_event_id)}
                      >
                        {expandedEvents.includes(event.trip_event_id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {expandedEvents.includes(event.trip_event_id) && (
                      <div className="px-4 pb-4">
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex justify-items-start items-center mb-4 text-gray-600 text-sm">
                            <span>{event.destination}</span>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg"
                              onClick={() =>
                                handleCopyAddress(event.destination)
                              }
                            >
                              <Copy className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                          <div className="flex gap-3">
                            <button
                              className="flex-1 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
                              onClick={() => onEditEvent(event.trip_event_id)}
                            >
                              수정
                            </button>
                            <button
                              className="flex-1 py-3 border border-red-200 rounded-lg hover:bg-red-50 text-red-500 text-sm"
                              onClick={() => onDeleteEvent(event.trip_event_id)}
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
        <div className={`absolute right-4 ${showMap ? 'top-4' : 'bottom-8'}`}>
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
    </div>
  );
};

export default TripDetail;
