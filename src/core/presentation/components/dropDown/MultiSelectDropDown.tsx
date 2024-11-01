import React from 'react';

interface Option {
  nickname: string;
  email: string;
}

export interface MultiSelectDropDownProps {
  options: Option[];
  onChange: (selectedValuesArray: string[]) => void;
  className?: string;
}

const MultiSelectDropDown: React.FC<MultiSelectDropDownProps> = ({
  options,
  onChange,
  className,
}) => {
  const handleClick = (email: string) => {
    onChange([email]); // 선택한 이메일을 배열로 감싸 전달.
  };

  return (
    <div
      className={`${className} absolute top-full left-0 w-full bg-black border border-gray-300 shadow-lg z-10 
        ${options.length > 0 ? 'max-h-40' : 'h-10'} overflow-y-auto`}
    >
      {options.length > 0 ? (
        options.map((option) => (
          <div
            key={option.email}
            onClick={() => handleClick(option.email)}
            className="p-2 cursor-pointer hover:bg-gray-500"
          >
            |{option.nickname}| : {option.email}
          </div>
        ))
      ) : (
        <div className="p-2 text-gray-500">검색 결과 없음</div>
      )}
    </div>
  );
};

export default MultiSelectDropDown;
