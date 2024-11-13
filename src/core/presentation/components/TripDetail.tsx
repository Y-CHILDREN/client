import { useEffect, useState } from 'react';
import {
  X,
  Map,
  MoreVertical,
  Plus,
  List,
  Calendar,
  CircleDollarSign,
} from 'lucide-react';
import { format, isSameDay, parseISO } from 'date-fns';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Avatar from 'react-avatar';
import { ko } from 'date-fns/locale';

import { Trip } from '@/core/domain/entities/trip.ts';
import User from '@/core/domain/entities/user.ts';

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
}

interface TripDetailProps {
  onClose: () => void;
  onCreateEvent: () => void;
}

const TripDetail: React.FC<TripDetailProps> = ({ onClose, onCreateEvent }) => {
  // 상태 관리
  const [tripScheduleData, setTripScheduleData] = useState<Trip>({
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
  });

  // tripEvents
  const [tripEvents, setTripEvents] = useState<TripEvent[]>([
    {
      trip_event_id: 1,
      trip_id: 1,
      title: '제주도 여행',
      destination: '제주도 서귀포시',
      start_date: new Date('2024-10-16').toISOString(),
      end_date: new Date('2024-10-18').toISOString(),
      cost: [
        { category: '식비', cost: 30000 },
        { category: '교통비', cost: 1500 },
      ],
      latitude: 33.2541,
      longitude: 126.5602,
    },
    {
      trip_event_id: 2,
      trip_id: 1,
      title: '서울 여행',
      destination: '서울 광화문',
      start_date: new Date('2024-10-16').toISOString(),
      end_date: new Date('2024-10-19').toISOString(),
      cost: [{ category: '식비', cost: 50000 }],
    },
    {
      trip_event_id: 3,
      trip_id: 1,
      title: '한라산 등반',
      destination: '한라산',
      start_date: new Date('2024-10-17').toISOString(),
      end_date: new Date('2024-10-17').toISOString(),
      cost: [{ category: '입장료', cost: 10000 }],
    },
  ]);

  // 비용 합계 계산
  const totalCost = tripEvents.reduce((acc, event) => {
    return acc + event.cost.reduce((sum, costItem) => sum + costItem.cost, 0);
  }, 0);

  // 멤버
  const [members, setMembers] = useState<User[]>([
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
  ]);

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
    isSameDay(parseISO(event.start_date), selectedDate),
  );

  // Map (Google Map api)
  // 지도 표시 여부
  const [showMap, setShowMap] = useState(false);
  const [mapMarkers, setMapMarkers] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  // 지도 옵션 설정
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  // 지도 표시 위치
  const mapCenter = {
    lat: 33.489011,
    lng: 126.498302,
  };

  // 핸들러
  const handleMapToggle = () => {
    setShowMap(!showMap);
  };

  const handleClose = () => {
    onClose();
  };

  const handleCreateEvent = () => {
    onCreateEvent();
  };

  // useEffect
  // 지도에 마커를 추가하는 로직
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
  }, [isLoaded]);

  // logging
  useEffect(() => {
    // console.log('Filtered Members:', filteredMembers);
    console.log('eventForSelectedDate', eventForSelectedDate);
  }, [filteredMembers, eventForSelectedDate]);

  return (
    <div className="flex flex-col w-full h-full max-w-[420px] bg-white min-h-[600px] relative">
      {/* 헤더 */}
      <header className="px-4 space-y-4">
        {/* 닫기, 지도, 추가기능 버튼 */}
        <div className="flex justify-between items-center pt-2">
          <button onClick={handleClose} className="p-1 bg-white">
            <X className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-4">
            <button onClick={handleMapToggle} className="bg-white">
              {showMap ? (
                <List className="h-6 w-6" />
              ) : (
                <Map className="h-6 w-6" />
              )}
            </button>
            <button className="bg-white">
              <MoreVertical className="h-6 w-6" />
            </button>
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
      <main className="flex-1">
        {showMap ? (
          isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={10}
            >
              {eventForSelectedDate.map((event) =>
                event.latitude !== undefined &&
                event.longitude !== undefined ? (
                  <Marker
                    key={event.trip_event_id}
                    position={{ lat: event.latitude, lng: event.longitude }}
                    title={event.title}
                  />
                ) : null,
              )}
            </GoogleMap>
          ) : (
            <div>Loading map...</div>
          )
        ) : eventForSelectedDate.length > 0 ? (
          <div className="flex flex-col">
            <div className="flex justify-between font-bold border-b border-gray-200 bg-gray-100">
              <h2>이벤트 일정</h2>
              <p>장소</p>
              <span>비용</span>
            </div>
            {eventForSelectedDate.map((event, index) => (
              <div key={index} className="flex justify-between">
                <h2>{event.title}</h2>
                <p>{event.destination}</p>
                <span>
                  비용:{' '}
                  {event.cost
                    .reduce((acc, costItem) => acc + costItem.cost, 0)
                    .toLocaleString()}{' '}
                  원
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4">일정을 추가해 주세요</p>
        )}
      </main>

      {/* 이벤트 추가 버튼 */}
      <div className={`absolute bottom-8 ${showMap ? 'left-4' : 'right-4'}`}>
        <button
          onClick={handleCreateEvent}
          className="bg-[#92e7c5] hover:bg-[#7fceb0] text-white rounded-full px-6 py-3 shadow-lg flex items-center justify-center transition-colors duration-200 focus:outline-none"
        >
          <Plus className="h-5 w-5 mr-2" />
          이벤트 추가
        </button>
      </div>
    </div>
  );
};

export default TripDetail;
