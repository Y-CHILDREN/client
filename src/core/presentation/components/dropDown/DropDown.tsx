import React from 'react';

interface DropDownProps {
  label?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  options: Array<{ label: string; value: string }>;
  className?: string;
}

const DropDown: React.FC<DropDownProps> = ({
  value,
  onChange,
  placeholder,
  options,
  className,
}) => {
  return (
    <div className={className}>
      <select value={value} onChange={onChange}>
        <option value="">{placeholder}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
