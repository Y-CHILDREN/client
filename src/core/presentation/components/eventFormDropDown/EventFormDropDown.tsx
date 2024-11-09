import { useState } from 'react';

const EventFormDropDown: React.FC = () => {
  const [isView, setView] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('항목 선택');

  const dropMenu = [
    { id: 1, label: '입장료' },
    { id: 2, label: '식비' },
    { id: 3, label: '주차비' },
    { id: 4, label: '기념품' },
  ];

  const dropDownHandler: () => void = () => {
    setView(!isView);
  };
  const categoryHandler = (value: string) => {
    setCategory(value);
    setView(!isView);
  };

  return (
    <div className="flex flex-col w-[40%] relative">
      <button
        onClick={dropDownHandler}
        className="flex items-center justify-between bg-transparent form-input-radius"
      >
        <p
          className={category !== '항목 선택' ? 'text-black' : 'text-gray-400'}
        >
          {category}
        </p>
        <img
          className="w-6 h-6"
          src="/src/core/presentation/assets/addEventForm/dropDownIcon.svg"
          alt="drop down 그림"
        />
      </button>
      {isView && (
        <ul className="cursor-pointer w-full absolute top-[60px] bg-white form-input-radius text-start  z-20">
          {dropMenu.map(({ id, label }) => (
            <li
              onClick={() => categoryHandler(label)}
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
