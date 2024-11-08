import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import Avatar from 'react-avatar';

import { Option } from '../Search/SearchInputComponent.tsx';

export interface MultiSelectDropDownProps {
  options: Option[];
  onChange: (selectedValuesArray: string[]) => void;
  onRemove: (email: string) => void;
  selectedMembers: string[];
  className?: string;
}

const MultiSelectDropDown: React.FC<MultiSelectDropDownProps> = ({
  options,
  onChange,
  onRemove,
  selectedMembers = [],
  className,
}) => {
  const handleClick = (email: string) => {
    if (selectedMembers.includes(email)) {
      onRemove(email); // 선택 해제할 경우 멤버 제거 핸들러 호출
    } else {
      const updatedValue = [...selectedMembers, email];
      onChange(updatedValue);
    }
  };

  useEffect(() => {
    console.log(
      'Updated selectedMembers in MultiSelectDropDown:',
      selectedMembers,
    );
  }, [selectedMembers]);

  return (
    <div
      className={`${className} absolute top-full left-0 w-full bg-white rounded-lg border border-gray-200 shadow-lg z-10 
        ${options.length > 0 ? 'max-h-[240px]' : 'h-[52px]'} overflow-y-auto mt-1`}
    >
      {options.length > 0 ? (
        options.map((option) => (
          <div
            key={option.email}
            onClick={() => handleClick(option.email)}
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Avatar
                src={option.avatar}
                name={option.nickname}
                size="32"
                round
                className="flex-shrink-0"
              />
              <span className="text-sm font-medium">{option.nickname}</span>
            </div>
            <div
              className={`w-5 h-5 rounded flex items-center justify-center
              ${
                selectedMembers.includes(option.email)
                  ? 'bg-[#92e7c5] text-white'
                  : 'border-2 border-gray-200'
              }`}
            >
              {selectedMembers.includes(option.email) && (
                <Check className="h-3 w-3" />
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full text-sm text-gray-500">
          검색 결과 없음
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropDown;
