import React, { useEffect, useState } from 'react';

const times: string[] = ['AM', 'PM'];
const hours: number[] = Array.from({ length: 12 }, (_, i) => i);
const minutes: number[] = Array.from({ length: 60 }, (_, i) => i);

interface ScrollableTimePickerProps {
  onStartTimeChange: (hour: number, minute: number, time: string) => void;
  onEndTimeChange: (hour: number, minute: number, time: string) => void;
}
const ScrollableTimePicker: React.FC<ScrollableTimePickerProps> = ({
  onStartTimeChange,
  onEndTimeChange,
}) => {
  const [selectedTime, setSelectedTime] = useState<string>('AM');
  const [selectedHour, setSelectedHour] = useState<number>(12);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [isSettingStartTime, setIsSettingStartTime] = useState<boolean>(true);

  // index 제한 함수
  const safeIndex = (index: number, max: number): number =>
    Math.max(0, Math.min(index, max));

  useEffect(() => {
    setSelectedHour(hours[0]);
    setSelectedMinute(minutes[0]);
    setSelectedTime(times[0]);
  }, []);

  const handleConfirm = () => {
    if (isSettingStartTime) {
      onStartTimeChange(selectedHour, selectedMinute, selectedTime);
      setIsSettingStartTime(false);
    } else {
      onEndTimeChange(selectedHour, selectedMinute, selectedTime);
    }
  };

  const handleScroll = (
    e: React.UIEvent<HTMLDivElement>,
    type: 'time' | 'hour' | 'minute',
  ): void => {
    const scrollTop = e.currentTarget.scrollTop;
    const itemHeight = 40;
    const maxIndex =
      type === 'hour'
        ? hours.length - 1
        : type === 'minute'
          ? minutes.length - 1
          : times.length - 1;

    const selectedIndex = safeIndex(
      Math.floor(scrollTop / itemHeight),
      maxIndex,
    );

    if (type === 'hour') {
      setSelectedHour(hours[selectedIndex]);
    } else if (type === 'minute') {
      setSelectedMinute(minutes[selectedIndex]);
    } else if (type === 'time') {
      setSelectedTime(times[selectedIndex]);
    }
  };

  const renderScrollItems = (
    items: string[] | number[],
    selected: string | number,
    type: 'time' | 'hour' | 'minute',
  ): JSX.Element => (
    <div
      className="w-16 h-40 overflow-y-scroll text-center no-scroll-bar"
      onScroll={(e) => handleScroll(e, type)}
    >
      {/* 상하 공백 */}
      <div className="h-[63px]" />
      {items.map((item) => (
        <div
          key={item}
          className={`h-10 flex items-center justify-center ${
            item === selected ? 'font-bold text-black' : 'text-gray-500'
          }`}
        >
          {item}
        </div>
      ))}
      {/* 상하 공백 */}
      <div className="h-[60px]" />
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4">
        <p>{isSettingStartTime ? '시작 시간' : '종료 시간'}</p>
        {renderScrollItems(hours, selectedHour, 'hour')}
        <span className="text-2xl font-semibold">:</span>
        {renderScrollItems(minutes, selectedMinute, 'minute')}
        {renderScrollItems(times, selectedTime, 'time')}
      </div>
      <button
        onClick={handleConfirm}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md"
      >
        저장
      </button>
    </div>
  );
};

export default ScrollableTimePicker;
