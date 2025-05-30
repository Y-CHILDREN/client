import { memo } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useUserTripStore } from '../../hooks/stores/userTripStore.ts';
import { useUserTripEventStore } from '../../hooks/stores/userTripEventStore.ts';

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
  isEvent?: boolean;
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
  isEvent,
}) => {
  let tripEndDay: Date | undefined;
  let tripStartDay: Date | undefined;
  const selectedTripId = useUserTripEventStore((state) => state.selectedTripId);
  const getSelectedTripById = useUserTripStore(
    (state) => state.getSelectedTripById,
  );

  // null 타입 체크
  const trip =
    selectedTripId !== null ? getSelectedTripById(selectedTripId) : undefined;

  // undefined 처리
  if (trip?.start_date) {
    tripStartDay = new Date(trip.start_date);
  }

  if (trip?.end_date) {
    tripEndDay = new Date(trip.end_date);
  }

  const dynamicMinDate = isEvent ? tripStartDay : minDate || new Date();
  const dynamicMaxDate = isEvent ? tripEndDay : maxDate;

  const today = new Date();

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
        minDate={dynamicMinDate}
        maxDate={dynamicMaxDate}
        dateFormat={dateFormat}
        showMonthDropdown={showMonthDropdown}
        showYearDropdown={showYearDropdown}
        inline={inline}
        locale={ko}
        dayClassName={(date) => {
          // 오늘 날짜와 비교하여 같은 날짜인지 확인
          return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
            ? 'react-datepicker__day--today'
            : 'react-datepicker__day--not-today';
        }}
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
                <ChevronLeft />
              </button>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type="button"
                className={`p-1 ${nextMonthButtonDisabled ? 'text-gray-300' : 'text-gray-700'} text-xl font-medium`}
              >
                <ChevronRight />
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
            color: #545759;
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
          .react-datepicker__day--disabled {
            color: #DCDEE0;
            pointer-events: none; /* 클릭 비활성화 */
          }
          .react-datepicker__day:hover {
            background-color: #f3f4f6;
          }
          .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range {
            background-color: #545759 !important;
            color: white !important;
          }
          .react-datepicker__day--today {
            background-color: white !important;
            color: #17B47B !important;
          }
          .react-datepicker__day--keyboard-selected {
            background-color: white;
          }
          .react-datepicker__navigation {
            top: 0.75rem;
          }
          .react-datepicker__navigation-icon::before {
            border-color: #DCDEE0;
          }
          .react-datepicker__year-read-view--down-arrow {
            border-color: #1f2937;
          }
      `}</style>
    </div>
  );
};

export default memo(DatePickerComponent);
