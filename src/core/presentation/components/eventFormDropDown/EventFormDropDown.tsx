import { useState } from 'react';

const EventFormDropDown: React.FC = () => {
  const [isView, setView] = useState<boolean>(false);

  const dropDownHandler: () => void = () => {
    setView(!isView);
  };
  const dropMenu = [
    { id: 1, label: '입장료' },
    { id: 2, label: '식비' },
    { id: 3, label: '주차비' },
    { id: 4, label: '기념품' },
  ];
  return (
    <div className="flex flex-col w-[40%] relative">
      <button
        onClick={dropDownHandler}
        className="flex items-center justify-between bg-transparent form-input-radius"
      >
        <p className="text-gray-400 ">항목 선택</p>
        <img
          className="w-6 h-6"
          src="/src/core/presentation/assets/addEventForm/dropDownIcon.svg"
          alt="drop down 그림"
        />
      </button>
      {isView && (
        <ul className="cursor-pointer w-full absolute top-[60px] bg-white form-input-radius text-start">
          {dropMenu.map(({ id, label }) => (
            <li className="py-3 pl-3 rounded-lg hover:bg-gray-100" key={id}>
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventFormDropDown;
