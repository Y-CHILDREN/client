import React, { useState } from 'react';

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
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValuesArray = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setSelected(selectedValuesArray);
    onChange(selectedValuesArray);
  };

  return (
    <div
      className={`${className} absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg z-10`}
    >
      <select
        multiple
        value={selected}
        onChange={handleChange}
        className="w-full p-2"
      >
        {options.map((option) => (
          <option key={option.email} value={option.email}>
            |{option.nickname}| : {option.email}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiSelectDropDown;
