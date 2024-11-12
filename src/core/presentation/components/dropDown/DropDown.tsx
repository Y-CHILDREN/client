import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface DropDownProps {
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
    <div className={`relative ${className}`}>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="appearance-none w-full bg-white px-4 py-2.5 pr-8 rounded-lg border border-gray-200
            focus:outline-none focus:ring-2 focus:ring-[#92e7c5] focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            text-sm transition-colors cursor-pointer"
        >
          <option value="" disabled className="text-gray-300">
            {placeholder}
          </option>
          {options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="py-2 text-gray-900 hover:bg-gray-100"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      <style>{`
          select option {
              padding: 0.5rem 1rem;
          }

          select option:hover {
              background-color: #f3f4f6;
          }
      `}</style>
    </div>
  );
};

export default DropDown;
