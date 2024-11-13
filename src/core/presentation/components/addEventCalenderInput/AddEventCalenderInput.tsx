import RequiredDot from '../requiredDot/RequiredDot.tsx';

const AddEventCalenderInput: React.FC = () => {
  return (
    <article className="flex flex-col gap-5">
      <div className="flex">
        <p className="">일정</p>
        <RequiredDot />
      </div>
      <button className="flex justify-between p-3 text-gray-400 bg-white border-2 border-gray-200 rounded-md text-start">
        시작 일시
        <img
          src="/src/core/presentation/assets/addEventForm/calenderIcon.svg"
          alt="달력 아이콘"
        />
      </button>
      <button className="flex justify-between p-3 text-gray-400 bg-white border-2 border-gray-200 rounded-md text-start">
        종료 일시
        <img
          src="/src/core/presentation/assets/addEventForm/calenderIcon.svg"
          alt="달력 아이콘"
        />
      </button>
    </article>
  );
};

export default AddEventCalenderInput;
