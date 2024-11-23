import React from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  onChange: (dates: [Date | null, Date | null]) => void;
  showMonthDropdown?: boolean;
  showMonthYearDropdown?: boolean;
  showYearDropdown?: boolean;
  inline?: boolean;
  className?: string;
  label?: string;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({
  startDate,
  endDate,
  minDate,
  maxDate,
  dateFormat = 'yyyy년 MM월 dd일',
  onChange,
  showMonthDropdown = false,
  showYearDropdown = false,
  inline = true,
  className,
  label,
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        minDate={minDate || new Date()}
        maxDate={maxDate}
        dateFormat={dateFormat}
        showMonthDropdown={showMonthDropdown}
        showYearDropdown={showYearDropdown}
        inline={inline}
        locale={ko}
        renderCustomHeader={({
          // 헤더 커스텀 CSS
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between px-5 py-2">
            <span className="text-lg font-bold">
              {date.getFullYear()}년 {date.getMonth() + 1}월
            </span>
            <div className="space-x-2">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                type="button"
                className={`p-1 ${prevMonthButtonDisabled ? 'text-gray-300' : 'text-gray-700'} text-xl font-medium`}
              >
                &lt;
              </button>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type="button"
                className={`p-1 ${nextMonthButtonDisabled ? 'text-gray-300' : 'text-gray-700'} text-xl font-medium`}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      />
      <style>{`
        .react-datepicker {
            font-family: inherit;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            background: white;
            padding: 0.5rem;
          }
          .react-datepicker__header {
            background: white;
            border-bottom: 1px solid #e5e7eb;
            padding-top: 0.5rem;
          }
          .react-datepicker__current-month {
            font-size: 1rem;
            font-weight: 500;
            padding: 0.5rem 0;
          }
          .react-datepicker__day-name {
            color: #6b7280;
            margin: 0.4rem;
            width: 2rem;
          }
          .react-datepicker__day {
            margin: 0.4rem;
            width: 2rem;
            height: 2rem;
            line-height: 2rem;
            border-radius: 0.25rem;
            color: #1f2937;
          }
          .react-datepicker__day:hover {
            background-color: #f3f4f6;
          }
          .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range {
            background-color: #545759 !important;
            color: white !important;
          }
          .react-datepicker__day--keyboard-selected {
            background-color: #f3f4f6;
            color: #17B47B !important;
          }
          .react-datepicker__navigation {
            top: 0.75rem;
          }
          .react-datepicker__navigation-icon::before {
            border-color: #1f2937;
          }
          .react-datepicker__year-read-view--down-arrow {
            border-color: #1f2937;
          }
      `}</style>
    </div>
  );
};

export default DatePickerComponent;
