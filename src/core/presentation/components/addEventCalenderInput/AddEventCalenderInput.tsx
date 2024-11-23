import RequiredDot from '../requiredDot/RequiredDot.tsx';

interface AddEventCalenderInputProps {
  openBottomSheet: () => void;
  data?: { start?: Date; end?: Date }; // 날짜 범위 추가
}

const AddEventCalenderInput: React.FC<AddEventCalenderInputProps> = ({
  openBottomSheet,
  data,
}) => {
  function dateFormat(date?: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }

  const formattedStartDate = dateFormat(data?.start);
  const formattedEndDate = dateFormat(data?.end);
  const handleOpenBottomSheet = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 이벤트 전파 막기
    openBottomSheet(); // 원래 함수 호출
  };

  return (
    <article className="flex flex-col gap-5">
      <div className="flex">
        <p className="">일정</p>
        <RequiredDot />
      </div>
      <button
        className={`flex justify-between p-3 ${data?.start ? 'text-black' : 'text-gray-400'} bg-white border-2 border-gray-200 rounded-md text-start`}
        onClick={handleOpenBottomSheet}
        type="button"
      >
        <p>{data?.start ? formattedStartDate : '시작 일시'}</p>
        <img src="/assets/addEventForm/calenderIcon.svg" alt="달력 아이콘" />
      </button>
      <button
        className={`flex justify-between p-3 ${data?.start ? 'text-black' : 'text-gray-400'} bg-white border-2 border-gray-200 rounded-md text-start`}
        onClick={handleOpenBottomSheet}
        type="button"
      >
        <p>{data?.end ? formattedEndDate : '종료 일시'}</p>
        <img src="/assets/addEventForm/calenderIcon.svg" alt="달력 아이콘" />
      </button>
    </article>
  );
};

export default AddEventCalenderInput;
