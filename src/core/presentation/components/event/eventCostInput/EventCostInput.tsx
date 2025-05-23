import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { Plus } from 'lucide-react';
import { Cost } from '../../../../domain/entities/event.ts';
interface EventCostInputProps {
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  defaultCosts?: Cost[];
}

import { useState } from 'react';
import { FormValues } from '../../../pages/AddEventPage.tsx';
import EventFormDropDown from '../eventFormDropDown/EventFormDropDown.tsx';

const EventCostInput: React.FC<EventCostInputProps> = ({
  register,
  setValue,
  getValues,
}) => {
  const [costInputs, setCostInputs] = useState([{ id: Date.now() }]);

  const addCostInput = () => {
    setCostInputs([...costInputs, { id: Date.now() }]);
  };

  const removeCostInput = (index: number) => {
    if (costInputs.length > 1) {
      // costInputs 배열이 1개 이상인 경우에만 필드를 삭제
      const updatedInputs = costInputs.filter((_, i) => i !== index); // 입력 필드 삭제
      setCostInputs(updatedInputs); // 상태 업데이트

      // react-hook-form 값 업데이트
      const updatedCost = getValues('cost').filter((_, i) => i !== index); // 현재 cost 값을 가져와서 삭제
      setValue('cost', updatedCost); // 업데이트된 배열로 cost 값 설정
    } else {
      // 입력 필드가 1개인 경우에는 값을 초기화
      setCostInputs([{ id: Date.now() }]);
      setValue('cost', []); //필드 값 초기화
    }
  };

  return (
    <article className="flex flex-col items-start">
      <p>경비</p>
      {costInputs.map((costInput, index) => {
        const { id } = costInput;
        return (
          <div key={id} className="flex justify-between w-full pt-3">
            <EventFormDropDown setValue={setValue} index={index} />
            <div className="flex w-[40%] form-input-radius">
              <input
                className="w-full no-spinner no-number-scroll"
                type="number"
                {...register(`cost.${index}.value`, {
                  setValueAs: (value) => (value ? Number(value) : undefined), // 문자열을 숫자로 변환
                })}
                onWheel={(event) => (event.target as HTMLInputElement).blur()}
              />
              <p>원</p>
            </div>
            <button
              type="button"
              className="p-0 border-none outline-none cursor-pointer bg-inherit "
              onClick={() => removeCostInput(index)} // 삭제 함수 호출
            >
              <img
                src="/assets/addEventForm/trashIcon.svg"
                alt="쓰레기통 아이콘"
              />
            </button>
          </div>
        );
      })}
      <button
        className="flex items-center justify-center w-full gap-1 mt-3"
        type="button"
        onClick={addCostInput}
      >
        <Plus size={16} />
        경비 추가
      </button>
    </article>
  );
};

export { EventCostInput };
