import React, { useEffect, useRef, useState } from 'react';
import { MoreVertical, Pencil, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface EventCardRowProps {
  index: number;
  title: string;
  location: string;
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
  location,
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
      className={`relative flex flex-col items-start snap-center flex-shrink-0 w-[90vw] max-w-[300px] h-[136px] bg-white rounded-[8px] shadow-lg mx-1 cursor-pointer ${
        isSelected ? '' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex pt-[12px] pr-[12px] pb-[8px] pl-[16px] items-center gap-[8px] self-stretch">
        {/* Time and Number Badge */}
        <div className="flex items-center gap-[8px] flex-1">
          <div className="flex w-[16px] h-[16px] flex-col justify-center items-center gap-[10px] bg-[#3ACC97] rounded-full text-white font-medium overflow-hidden text-white text-center text-ellipsis font-semibold text-[10px] leading-[14px]">
            {index}
          </div>
          <div className="overflow-hidden text-[#17B47B] text-ellipsis font-semibold text-[14px] leading-[20px]">
            {format(new Date(startDate), 'HH:mm', { locale: ko })} -{' '}
            {format(new Date(endDate), 'HH:mm', { locale: ko })}
          </div>
        </div>

        {/* 드롭다운 버튼 */}
        <div ref={dropdownRef} className="relative ml-auto">
          <button
            className="p-1 hover:bg-gray-100 rounded-lg bg-white"
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
          {showDropdown && (
            <div className="absolute top-full right-0 flex w-[124px] p-[6px] flex-col items-start bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.();
                  setShowDropdown(false);
                }}
                className="flex h-[40px] p-[12px] pt-[12px] pl-[8px] items-center gap-[4px] self-stretch bg-white"
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
                className="flex h-[40px] p-[12px] pt-[12px] pl-[8px] items-center gap-[4px] self-stretch bg-white text-red-500"
              >
                <Trash className="w-4 h-4 mr-2" />
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex pt-[0px] pr-[16px] pl-[16px] items-start gap-[12px] flex-1 self-stretch">
        {image ? (
          <div>
            <img
              src={image}
              alt={title}
              className="w-[60px] h-[60px] rounded-[6px] border border-[#DCDEE0]"
            />
          </div>
        ) : (
          <div className="flex w-[60px] h-[60px] rounded-[6px] border border-[#DCDEE0] items-center justify-center">
            <span className="text-black text-[10px] ">Not image</span>
          </div>
        )}
        <div className="flex flex-col items-start flex-1 self-stretch">
          <div className="flex items-center self-stretch">
            <span className="text-[#151616] text-ellipsis overflow-hidden font-semibold text-[16px] leading-[24px]">
              {title}
            </span>
          </div>
          <div className="flex items-start gap-[4px] self-stretch">
            <span className="font-normal text-[13px] leading-[18px] truncate max-w-[150px]">
              {location}
            </span>
          </div>
          <div className="flex justify-center items-center gap-[4px]">
            <span className="overflow-hidden text-[#545759] text-ellipsis font-normal text-[13px] leading-[18px]">
              {cost.toLocaleString()} 원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardRow;
