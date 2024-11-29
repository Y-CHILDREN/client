import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../../../pages/AddEventPage.tsx';
import DatePickerComponent from '../../datePicker/DatePickerComponent.tsx';
import ScrollableTimePicker from '../../scrollableTimePicker/ScrollableTimePicker.tsx';

const EventBottomSheetContent = () => {
  const { setValue } = useFormContext<FormValues>();
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  });

  const handleStartTimeChange = (
    hour: number,
    minute: number,
    time: string,
  ) => {
    const selectedStartDate = new Date(dateRange.start || Date.now());
    if (time === 'PM') hour += 12;
    selectedStartDate.setHours(hour, minute);

    setDateRange((prev) => {
      const updatedRange = { ...prev, start: selectedStartDate };
      setValue('dateRange', updatedRange);
      return updatedRange;
    });
  };

  const handleEndTimeChange = (hour: number, minute: number, time: string) => {
    const selectedEndDate = new Date(dateRange.end || Date.now());
    if (time === 'PM') hour += 12;
    selectedEndDate.setHours(hour, minute);

    setDateRange((prev) => {
      const updatedRange = { ...prev, end: selectedEndDate };
      setValue('dateRange', updatedRange);
      return updatedRange;
    });
  };

  const handleDateChange = (
    update: [Date | null | undefined, Date | null | undefined],
  ) => {
    const [selectedStartDate, selectedEndDate] = update.map(
      (date) => date || undefined,
    );
    const updatedRange = { start: selectedStartDate, end: selectedEndDate };

    setDateRange(updatedRange);
    setValue('dateRange', updatedRange);
  };

  return (
    <>
      <DatePickerComponent
        onChange={handleDateChange}
        startDate={dateRange.start || undefined}
        endDate={dateRange.end || undefined}
        isEvent={true}
      />
      <ScrollableTimePicker
        onStartTimeChange={handleStartTimeChange}
        onEndTimeChange={handleEndTimeChange}
      />
    </>
  );
};

export { EventBottomSheetContent };
