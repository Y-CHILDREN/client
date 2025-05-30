import React, { useEffect, useRef, useState } from 'react';
import Footer from '../layout/Footer';
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
import { format, isSameDay, isWithinInterval, parseISO } from 'date-fns';
import Avatar from 'react-avatar';
import { ko } from 'date-fns/locale';

import User from '@/core/domain/entities/user.ts';
import { Event } from '@/core/domain/entities/event.ts';
import { useUserTripEventStore } from '../../hooks/stores/userTripEventStore';
import { useGoogleMapsStore } from '@/core/presentation/hooks/stores/googleMapsStore.ts';

import EventCardList from '@/core/presentation/components/TripDetail/eventCardList/EventCardList.tsx';
import MapWithMarkers from '@/core/presentation/components/TripDetail/map/MapWithMarkers.tsx';
import { useAuthStore } from '@/core/presentation/hooks/stores/authStore.ts';
import useTripStore from '@/core/presentation/hooks/stores/tripStore.ts';

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
    updateEventPhotos,
  } = useUserTripEventStore();
  const { fetchTripMembers, fetchTrip, tripData } = useTripStore();
  const { user } = useAuthStore();

  // tripData
  const tripScheduleData = tripData;

  // 선택 또는 포커싱된 이벤트
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [memberProfiles, setMemberProfiles] = useState<User[]>([]);

  // 멤버의 유저 정보를 가져오는 로직
  useEffect(() => {
    const fetchMemberProfiles = async () => {
      if (!tripScheduleData?.members || tripScheduleData.members.length === 0) {
        setMemberProfiles([]);
        return;
      }

      try {
        const users = await fetchTripMembers(tripScheduleData.members);
        console.log('users:', users);
        setMemberProfiles(users);
      } catch (error) {
        console.error('멤버 유저 정보 조회 실패:', error);
      }
    };

    fetchMemberProfiles();
  }, [tripScheduleData]);

  // 비용 합계 계산
  const totalCost = tripEvents
    .reduce((acc, event) => {
      return (
        acc + event.cost.reduce((sum, costItem) => sum + costItem.value, 0)
      );
    }, 0)
    .toLocaleString('ko-KR');

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
  const eventForSelectedDate = tripEvents
    .filter((event) =>
      selectedDate
        ? isWithinInterval(selectedDate, {
            start: parseISO(event.start_date),
            end: parseISO(event.end_date),
          })
        : false,
    )
    .sort(
      (a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
    );

  // Map (Google Map api)
  // 지도 표시 여부
  const [showMap, setShowMap] = useState(false);

  // 초기 지도 포커싱.
  const [mapcenter, setMapcenter] = useState<google.maps.LatLngLiteral | null>(
    null,
  );

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

  // 페이지 로드 시 여행 정보 및 이벤트 데이터 조회
  useEffect(() => {
    if (selectedTripId && user) {
      // 여행 정보 가져오기.
      fetchTrip(selectedTripId);

      // 여행 이벤트 데이터 가져오기
      fetchTripEvents(selectedTripId);
    }
  }, [selectedTripId]);

  // 여행 지도 초기 위치 계산 함수.
  const handleMapCenter = (destination: string) => {
    const geocoder = new google.maps.Geocoder();

    return new Promise<google.maps.LatLngLiteral>((resolve, reject) => {
      geocoder.geocode({ address: destination }, (results, status) => {
        if (results === null) {
          return console.log('목적지에 맞는 위치 정보가 없습니다.');
        }

        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          const latLng = { lat: location.lat(), lng: location.lng() };
          resolve(latLng);
          // console.log('latLng', latLng);
        } else {
          console.error('위치 정보를 불러오는데 실패했습니다: ', status);
          reject(new Error('Geocoding failed'));
        }
      });
    });
  };

  useEffect(() => {
    // tripEvent에 위치 정보 && Place Image를 추가하는 로직
    const fetchAndUpdateEvents = async () => {
      try {
        if (selectedTripId) {
          await fetchTripEvents(selectedTripId); // 이벤트 데이터 가져오기
          await updateEventCoordinates(); // 좌표 업데이트
          await updateEventPhotos(); // 사진 업데이트
        }
      } catch (error) {
        console.error('데이터 처리 중 오류:', error);
      }

      // 초기 지도 포커싱 설정
      if (!mapcenter && tripScheduleData?.destination) {
        handleMapCenter(tripScheduleData.destination)
          .then((center) => {
            setMapcenter(center); // 상태 업데이트
          })
          .catch((error) => {
            console.error('Error setting map center:', error);
          });
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
    console.log('tripEvents:', tripEvents);
    // console.log('showMap:', showMap);
    // console.log('Filtered Members:', filteredMembers);
    // console.log('eventForSelectedDate', eventForSelectedDate);
    // console.log('selectedEvent', selectedEvent);
  }, [tripEvents]);

  return (
    <div className="flex flex-col w-full h-full bg-white min-h-[600px]">
      {/*tripScheduleData 없으면 메시지 출력*/}
      {!tripScheduleData ? (
        <p>선택된 여행 데이터를 찾을 수 없습니다.</p>
      ) : (
        <>
          {/* 헤더 */}
          <header>
            {/* 닫기, 지도, 추가기능 버튼 */}
            <div className="relative flex items-center justify-between px-2">
              <button
                onClick={handleClose}
                className="w-12 h-12 p-2 bg-white rounded-lg hover:bg-gray-100 focus:outline-none"
              >
                <X />
              </button>
              <div className="flex items-center" ref={dropdownRefMoreVertical}>
                {/* 맵 버튼 */}
                <button
                  onClick={handleMapToggle}
                  className="w-12 h-12 p-3 bg-white rounded-lg hover:bg-gray-100 focus:outline-none"
                >
                  {showMap ? <List /> : <Map />}
                </button>

                {/* 추가기능 버튼 */}
                <button
                  className="w-12 h-12 p-3 bg-white rounded-lg hover:bg-gray-100 focus:outline-none"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <MoreVertical />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
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

            <div>
              <div className="flex flex-col items-start self-stretch gap-3 p-6 pt-5 pb-5 pl-5">
                {/* 제목 */}
                <div className="flex items-center self-stretch gap-3">
                  <span className="text-[28px] font-semibold leading-7 text-gray-900 text-left">
                    {tripScheduleData.title}
                  </span>
                </div>

                <div className="flex items-start self-stretch gap-2">
                  {/* 날짜, 경비 */}
                  <div className="flex flex-col items-start flex-1 gap-2">
                    <span className="flex items-center gap-2 self-stretch text-[#737678] text-[16px] font-normal leading-[20px]">
                      <Calendar className="w-4 h-4" />
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
                    <span className="flex items-center gap-2 self-stretch text-[#737678] text-[16px] font-normal leading-[20px]">
                      <CircleDollarSign className="w-4 h-4" />
                      <span>{totalCost} 원</span>
                    </span>
                  </div>
                  {/* 멤버 아바타 */}
                  <div
                    className="relative h-8"
                    style={{
                      width: `${memberProfiles.length > 4 ? 5 * 20 : memberProfiles.length * 20 + 12}px`,
                    }}
                  >
                    {memberProfiles.slice(0, 4).map((member, index) => (
                      <div
                        key={member.email}
                        className="absolute"
                        style={{ left: `${index * 20}px`, zIndex: 10 - index }} // 겹치게
                      >
                        <Avatar
                          name={member.nickname}
                          src={member.user_image}
                          size="32"
                          round
                          color={`hsl(${index * 60}, 70%, 85%)`}
                        />
                      </div>
                    ))}
                    {memberProfiles.length > 4 && (
                      <div
                        className="absolute flex items-center justify-center w-8 h-8 text-sm text-gray-600 bg-gray-100 border-2 border-white rounded-full"
                        style={{
                          left: `${4 * 20}px`,
                          zIndex: 11, // 가장 위로
                        }}
                      >
                        +{memberProfiles.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/*  날짜 선택 탭 */}
          <nav className="border-gray-200 border-y">
            <div className="flex gap-4 overflow-x-auto hide-scrollbar">
              {dateOptions.map((date) => (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-1 min-w-[100px] py-3 px-4 text-center relative bg-white focus:outline-none flex items-center justify-center
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
          <main className="relative flex-1 bg-[#F5F6F6]">
            {showMap ? (
              <>
                {isLoaded ? (
                  <MapWithMarkers
                    events={eventForSelectedDate}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    selectedEvent={selectedEvent}
                    setSelectedEvent={setSelectedEvent}
                    mapCenter={
                      mapcenter || { lat: 37.56521290000001, lng: 126.9773517 }
                    } // 디폴트 위치: 서울
                  />
                ) : (
                  <div>Loading map...</div>
                )}
                {/* 지도 모드일 때의 이벤트 추가 버튼 */}
                <div
                  className={`absolute ${eventForSelectedDate.length > 0 ? 'bottom-[168px]' : 'bottom-5'} right-4 z-10 flex justify-center`}
                >
                  <button
                    onClick={handleCreateEvent}
                    className="flex pt-3 pr-5 pb-3 pl-4 items-center gap-2 rounded-full bg-[#3ACC97] shadow-lg"
                  >
                    <Plus className="w-4 h-4 text-white" />
                    <span className="text-sm font-semibold leading-5 text-center text-white">
                      이벤트 추가
                    </span>
                  </button>
                </div>
              </>
            ) : eventForSelectedDate.length > 0 ? (
              <div className="flex flex-col gap-3 p-4 mb-10">
                {eventForSelectedDate.map((event, index) => (
                  <div key={event.event_id}>
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3ACC97] text-white">
                          {index + 1}
                        </div>
                        <div className="text-[13px] font-semibold text-gray-500">
                          {format(event.start_date, 'HH:mm', { locale: ko })}
                        </div>
                      </div>
                      <div className="justify-between flex-1 p-3 px-5 space-y-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <div className="flex flex-row items-center justify-between flex-1">
                          <div className="flex flex-col items-start w-full">
                            <div className="flex flex-row items-center justify-between w-full space-x-3 text-sm text-gray-600">
                              <div className="text-base font-semibold text-gray-90">
                                {event.event_name}
                              </div>
                              <button
                                className="p-1 bg-white"
                                onClick={() =>
                                  handleExpandEvent(event.event_id)
                                }
                              >
                                {expandedEvents.includes(event.event_id) ? (
                                  <ChevronUp className="w-5 h-5 text-gray-400" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                              </button>
                            </div>
                            <div className="flex flex-row items-center justify-between w-full space-x-3 text-sm text-gray-600">
                              <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-28">
                                {event.location
                                  .split(' ')
                                  .slice(0, 2)
                                  .join(' ')}
                              </div>
                              <div className="ml-auto">
                                {event.cost
                                  .reduce((sum, item) => sum + item.value, 0)
                                  .toLocaleString()}{' '}
                                원
                              </div>
                            </div>
                          </div>
                        </div>
                        {expandedEvents.includes(event.event_id) && (
                          <div className="pb-1 ">
                            <div className="pt-1 border-t border-gray-100">
                              <div className="flex justify-start items-center mb-2.5 text-gray-600 text-sm">
                                <span className="text-left">
                                  {event.location}
                                </span>
                                <button
                                  className="p-2 rounded-lg hover:bg-gray-100"
                                  onClick={() =>
                                    handleCopyAddress(event.location)
                                  }
                                >
                                  <Copy className="w-4 h-4 text-gray-400" />
                                </button>
                              </div>
                              <div className="flex gap-3">
                                <button
                                  className="flex-1 py-3 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                                  onClick={() => onEditEvent(event.event_id)}
                                >
                                  수정
                                </button>
                                <button
                                  className="flex-1 py-3 text-sm text-red-500 bg-white border border-red-200 rounded-lg hover:bg-red-50"
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
                {/* 이벤트 추가 버튼 */}
                <div>
                  <button
                    onClick={handleCreateEvent}
                    className="absolute bottom-20 right-4 z-10 flex pt-3 pr-5 pb-3 pl-4 items-center gap-2 rounded-full bg-[#3ACC97] shadow-lg"
                  >
                    <Plus className="w-4 h-4 text-white" />
                    <span className="text-sm font-semibold leading-5 text-center text-white">
                      이벤트 추가
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="px-4 mt-4">일정을 추가해 주세요</p>
                <button
                  onClick={handleCreateEvent}
                  className="absolute bottom-20 right-4 z-10 flex pt-3 pr-5 pb-3 pl-4 items-center gap-2 rounded-full bg-[#3ACC97] shadow-lg"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold leading-5 text-center text-white">
                    이벤트 추가
                  </span>
                </button>
              </>
            )}

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
            <div className="absolute bottom-0 w-full">
              {!showMap && <Footer />}
            </div>
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
