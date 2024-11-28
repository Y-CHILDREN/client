import { FieldErrors } from 'react-hook-form';
import RequiredDot from '../../requiredDot/RequiredDot.tsx';
import { FormValues } from '../../../pages/AddEventPage.tsx';

interface EventCalenderInputProps {
  openBottomSheet: () => void;
  dateRange: { start?: Date; end?: Date }; // 날짜 범위 추가
  errors: FieldErrors<FormValues>;
}

const EventCalenderInput: React.FC<EventCalenderInputProps> = ({
  openBottomSheet,
  dateRange,
  errors,
}) => {
  function dateFormat(dateRange?: Date): string {
    if (!dateRange) return '';
    const year = dateRange.getFullYear();
    const month = (dateRange.getMonth() + 1).toString().padStart(2, '0');
    const day = dateRange.getDate().toString().padStart(2, '0');
    const hours = dateRange.getHours().toString().padStart(2, '0');
    const minutes = dateRange.getMinutes().toString().padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }

  const formattedStartDate = dateFormat(dateRange?.start);
  const formattedEndDate = dateFormat(dateRange?.end);
  const handleOpenBottomSheet = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 이벤트 전파 막기
    openBottomSheet(); // 원래 함수 호출
  };

  return (
    <article className="flex flex-col gap-5 text-left">
      <div className="flex">
        <p className="">일정</p>
        <RequiredDot />
      </div>
      <button
        className={`flex justify-between p-3 ${dateRange?.start ? 'text-black' : 'text-gray-400'} bg-white border-2 border-gray-200 rounded-md text-start`}
        onClick={handleOpenBottomSheet}
        type="button"
      >
        <p>{dateRange?.start ? formattedStartDate : '시작 일시'}</p>
        <img src="/assets/addEventForm/calenderIcon.svg" alt="달력 아이콘" />
      </button>
      <button
        className={`flex justify-between p-3 ${dateRange?.start ? 'text-black' : 'text-gray-400'} bg-white border-2 border-gray-200 rounded-md text-start`}
        onClick={handleOpenBottomSheet}
        type="button"
      >
        <p>{dateRange?.end ? formattedEndDate : '종료 일시'}</p>
        <img src="/assets/addEventForm/calenderIcon.svg" alt="달력 아이콘" />
      </button>
      {errors.dateRange && (
        <p className="mt-2 text-sm text-red-500">
          {errors.dateRange.message !== 'Required'
            ? errors.dateRange.message
            : '시작일과 종료일 값은 필수입니다.'}
        </p>
      )}
    </article>
  );
};

export { EventCalenderInput };
