import { useEffect, useState } from 'react';

import DatePickerComponent from '../datePicker/DatePickerComponent.tsx';
import ScrollableTimePicker from '../scrollableTimePicker/ScrollableTimePicker.tsx';

const AddEventBottomSheetContent = () => {
  const [dateRange, setDateRange] = useState<{
    start?: Date;
    end?: Date;
  }>({ start: undefined, end: undefined });

  const handleDateChange = (
    update: [Date | null | undefined, Date | null | undefined],
  ) => {
    let [selectedStartDate, selectedEndDate] = update;

    // null을 undefined로 변환
    if (selectedStartDate === null) selectedStartDate = undefined;
    if (selectedEndDate === null) selectedEndDate = undefined;

    setDateRange({
      start: selectedStartDate,
      end: selectedEndDate,
    });
  };

  // 상태 업데이트

  useEffect(() => {
    console.log('start:', dateRange.start);
    console.log('end:', dateRange.end);
  }, [dateRange]); // dateRange가 변경될 때마다 호출됩니다.
  return (
    <>
      <DatePickerComponent
        onChange={handleDateChange}
        startDate={dateRange.start || undefined}
        endDate={dateRange.end || undefined}
      />
      <ScrollableTimePicker />
    </>
  );
};

export default AddEventBottomSheetContent;
