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
    onChange(selected);
  };

  return (
    <div className={className}>
      <select multiple value={selected} onChange={handleChange}>
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
