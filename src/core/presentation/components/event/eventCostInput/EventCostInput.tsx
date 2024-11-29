import { UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { UseFormSetValue } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import EventFormDropDown from '../eventFormDropDown/EventFormDropDown.tsx';
import { Cost, FormValues } from '../../../pages/AddEventPage.tsx';
interface AddEventCostInputProps {
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  defaultCosts?: Cost[];
}

const EventCostInput: React.FC<AddEventCostInputProps> = ({
  register,
  setValue,
  getValues,
  defaultCosts,
}) => {
  // defaultCosts가 있으면 그에 맞는 입력 필드 초기화
  const [costInputs, setCostInputs] = useState(
    defaultCosts && defaultCosts.length > 0
      ? defaultCosts.map((_, index) => ({ id: Date.now() + index }))
      : [{ id: Date.now() }],
  );

  // 초기 렌더링 시 기본값 설정
  useEffect(() => {
    if (Array.isArray(defaultCosts) && defaultCosts.length > 0) {
      setValue('cost', defaultCosts);
    }
  }, [defaultCosts, setValue]);

  const addCostInput = () => {
    setCostInputs([...costInputs, { id: Date.now() }]);
  };

  const removeCostInput = (index: number) => {
    if (costInputs.length > 1) {
      const updatedInputs = costInputs.filter((_, i) => i !== index);
      setCostInputs(updatedInputs);

      const updatedCost = getValues('cost').filter((_, i) => i !== index);
      setValue('cost', updatedCost);
    } else {
      setCostInputs([{ id: Date.now() }]);
      setValue('cost', []);
    }
  };

  return (
    <article className="flex flex-col items-start">
      <p>경비</p>
      {costInputs.map((costInput, index) => {
        const { id } = costInput;
        return (
          <div key={id} className="flex justify-between w-full pt-3">
            <EventFormDropDown
              setValue={setValue}
              index={index}
              defaultCategory={defaultCosts?.[index]?.category} // 카테고리 기본값 추가
            />
            <div className="flex w-[40%] form-input-radius">
              <input
                className="w-full no-spinner no-number-scroll"
                type="number"
                defaultValue={defaultCosts?.[index]?.value} // 기본값 추가
                {...register(`cost.${index}.value`, {
                  setValueAs: (value) => (value ? Number(value) : undefined),
                })}
                onWheel={(event) => (event.target as HTMLInputElement).blur()}
              />
              <p>원</p>
            </div>
            <button
              type="button"
              className="p-0 border-none outline-none cursor-pointer bg-inherit "
              onClick={() => removeCostInput(index)}
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
