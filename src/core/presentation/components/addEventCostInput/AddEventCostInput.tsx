import EventFormDropDown from '../eventFormDropDown/EventFormDropDown.tsx';

const AddEventCostInput: React.FC = () => {
  return (
    <article className="flex flex-col items-start">
      <p>경비</p>
      <div className="flex justify-between w-full gap-3 pt-3">
        <EventFormDropDown />
        <div className="flex w-[40%] form-input-radius">
          <input className="w-full no-spinner" type="number" />
          <p>원</p>
        </div>
        <button className="p-0 border-none outline-none cursor-pointer bg-inherit">
          <img
            src="/src/core/presentation/assets/addEventForm/trashIcon.svg"
            alt="쓰레기통 아이콘"
          />
        </button>
      </div>
    </article>
  );
};

export default AddEventCostInput;
