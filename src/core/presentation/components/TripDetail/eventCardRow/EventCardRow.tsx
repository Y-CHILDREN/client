import React, { useEffect, useRef, useState } from 'react';
import { MoreVertical, Pencil, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface EventCardRowProps {
  index: number;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  image?: string;
  cost: number;
  isSelected?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const EventCardRow: React.FC<EventCardRowProps> = ({
  index,
  title,
  destination,
  startDate,
  endDate,
  image,
  cost,
  isSelected = false,
  onClick,
  onEdit,
  onDelete,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭으로 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`snap-center flex-shrink-0 w-[90vw] min-w-[270px] max-w-[360px] bg-white rounded-2xl shadow-lg mx-2 cursor-pointer ${
        isSelected ? 'ring-2 ring-[#3ACC97]' : ''
      }`}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex flex-col gap-4">
          {/* Time and Number Badge */}
          <div className="flex items-center w-full relative">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3ACC97] text-white font-medium">
                {index}
              </div>
              <div className="text-sm text-gray-500 whitespace-nowrap">
                {format(new Date(startDate), 'HH:mm', { locale: ko })} -{' '}
                {format(new Date(endDate), 'HH:mm', { locale: ko })}
              </div>
            </div>

            {/* 드롭다운 버튼 */}
            <div ref={dropdownRef} className="ml-auto">
              <button
                className="p-1 hover:bg-gray-100 rounded-lg bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(!showDropdown);
                }}
              >
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
              {showDropdown && (
                <div className="absolute top-full right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.();
                      setShowDropdown(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    수정
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.();
                      setShowDropdown(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex items-start gap-3">
            {image && (
              <img
                src={image}
                alt={title}
                className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg object-cover"
              />
            )}
            <div className="flex flex-col items-start">
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-gray-600 truncate max-w-[150px]">
                {destination}
              </p>
              <p className="text-sm font-medium mt-1">
                {cost.toLocaleString()} 원
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardRow;
