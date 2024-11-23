import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { FormValues } from '../../pages/AddEventPage.tsx';

interface EventFormDropDownProps {
  setValue: UseFormSetValue<FormValues>;
  index: number;
}

const EventFormDropDown: React.FC<EventFormDropDownProps> = ({
  setValue,
  index,
}) => {
  const [isView, setView] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('항목 선택');

  const dropMenu = [
    { id: 1, label: '입장료' },
    { id: 2, label: '식비' },
    { id: 3, label: '주차비' },
    { id: 4, label: '기념품' },
  ];

  const dropDownHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setView(!isView);
  };

  const categoryHandler = (value: string, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setCategory(value);
    setView(!isView);
    setValue(`cost.${index}.category`, value); // 수정된 부분
  };

  return (
    <div className="flex flex-col w-[40%] relative">
      <button
        onClick={dropDownHandler}
        className="flex items-center justify-between bg-transparent form-input-radius"
        type="button"
      >
        <p
          className={category !== '항목 선택' ? 'text-black' : 'text-gray-400'}
        >
          {category}
        </p>
        <img
          className="w-6 h-6"
          src="/assets/addEventForm/dropDownIcon.svg"
          alt="drop down 그림"
        />
      </button>
      {isView && (
        <ul className="cursor-pointer w-full absolute top-[60px] bg-white form-input-radius text-start z-20">
          {dropMenu.map(({ id, label }) => (
            <li
              onClick={(e) => categoryHandler(label, e)}
              className="z-10 py-3 pl-3 bg-white rounded-lg hover:bg-gray-100"
              key={id}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventFormDropDown;
