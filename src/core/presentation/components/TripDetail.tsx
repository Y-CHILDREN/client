import { useEffect, useState } from 'react';
import { X, Map, MoreVertical, Plus } from 'lucide-react';
import { format, isSameDay, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

import { Trip } from '@/core/domain/entities/trip.ts';
import User from '@/core/domain/entities/user.ts';
import Avatar from 'react-avatar';

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
}

interface TripDetailProps {
  onClose: () => void;
}

const TripDetail: React.FC<TripDetailProps> = ({ onClose }) => {
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
    },
    {
      trip_event_id: 2,
      trip_id: 1,
      title: '서울 여행',
      destination: '서울 광화문',
      start_date: new Date('2024-10-18').toISOString(),
      end_date: new Date('2024-10-19').toISOString(),
      cost: [{ category: '식비', cost: 50000 }],
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
        'data:image/jpeg;base64,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',
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
        'data:image/jpeg;base64,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',
      nickname: '오니',
      user_memo: '',
      access_token:
        'ya29.a0AeDClZATQawfEtSOFBuLyj7BT9_-M08opxchQyiG2Txon7g2QeTqs8oCmSF7yvM-I4k6WBEXkbOn_a9uxDOPk_2rA1B4U8bzhWtzHY0Nksm2RxFLEp5sVTRIIVtwA9X8yq9MtU0KDgSEa2fbPw291lNY7vY3eovFs6K1dZDOaCgYKAV0SARESFQHGX2MiiiZY27UlPJgpQdO8D0Racw0175',
      refresh_token:
        '1//0e-1UcIDy2ik0CgYIARAAGA4SNwF-L9IrQjKLMVENaGMaSrpTfZRZWhiZCMn19K1p9HsAGqGHhoNrS9UYHS_7Q8fTR9AceoOyXJ0',
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

  // 핸들러
  const handleClose = () => {
    onClose();
  };

  // useEffect
  useEffect(() => {
    console.log('Filtered Members:', filteredMembers);
  }, [filteredMembers]);

  return (
    <div className="flex flex-col w-full h-full max-w-md bg-white min-h-[600px] relative">
      {/* 헤더 */}
      <header className="px-4 space-y-4">
        {/* 닫기, 지도, 추가기능 버튼 */}
        <div className="flex justify-between items-center pt-2">
          <button onClick={handleClose} className="p-1 bg-white">
            <X className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-4">
            <button className="bg-white">
              <Map className="h-6 w-6" />
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
            <div className="flex flex-col items-center">
              <span className="mr-auto">
                {format(parseISO(tripScheduleData.start_date), 'yyyy. MM. dd', {
                  locale: ko,
                })}{' '}
                -{' '}
                {format(parseISO(tripScheduleData.end_date), 'yyyy. MM. dd', {
                  locale: ko,
                })}
              </span>
              <span className="mr-auto">
                Total Cost: <strong>{totalCost} 원</strong>
              </span>
            </div>

            {/* 멤버 아바타 */}
            <div className="flex -space-x-2">
              {members.slice(0, 3).map((member, index) => (
                <Avatar
                  key={member.id}
                  name={member.nickname}
                  src={member.user_image}
                  size="32"
                  round
                  color={`hsl(${index * 60}, 70%, 85%)`}
                />
              ))}
              {members.length > 3 && (
                <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-sm text-gray-600">
                  +{members.length - 3}
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
        {eventForSelectedDate.length > 0 ? (
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
          <p>이벤트를 추가해 주세요</p>
        )}
      </main>

      {/* 이벤트 추가 버튼 */}
      <div className="absolute bottom-8  right-4">
        <button className="bg-[#92e7c5] hover:bg-[#7fceb0] text-white rounded-full px-6 py-3 shadow-lg flex items-center justify-center transition-colors duration-200">
          <Plus className="h-5 w-5 mr-2" />
          이벤트 추가
        </button>
      </div>
    </div>
  );
};

export default TripDetail;
