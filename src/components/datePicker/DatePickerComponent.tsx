import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  onChange: (dates: [Date | null, Date | null]) => void;
  showMonthDropdown?: boolean;
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
  dateFormat = 'MM/dd/yyyy',
  onChange,
  showMonthDropdown = false,
  showYearDropdown = false,
  inline = false,
  className,
  label,
}) => {
  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        minDate={minDate || new Date()}
        maxDate={maxDate}
        dateFormat={dateFormat}
        showMonthDropdown={showMonthDropdown}
        showYearDropdown={showYearDropdown}
        inline={inline}
      />
    </div>
  );
};

export default DatePickerComponent;
