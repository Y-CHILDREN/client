import EventFormDropDown from '../eventFormDropDown/EventFormDropDown.tsx';
import { useState } from 'react';
const AddEventCostInput: React.FC = () => {
  const [costInputs, setCostInputs] = useState([{ id: Date.now() }]);
  const addCostInput = () => {
    setCostInputs([...costInputs, { id: Date.now() }]); // 새로운 입력 필드 추가
  };
  // 스타일 깨짐
  return (
    <article className="flex flex-col items-start">
      <p>경비</p>
      {costInputs.map((costInput) => {
        const { id } = costInput;
        return (
          <div key={id} className="flex justify-between w-full gap-3 pt-3">
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
        );
      })}
      {/* 경비 추가 버튼 */}
      <button className="w-full mt-3" onClick={addCostInput}>
        + 경비 추가
      </button>
    </article>
  );
};

export default AddEventCostInput;