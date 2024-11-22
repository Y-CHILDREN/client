import { useState } from 'react';

import DatePickerComponent from '../datePicker/DatePickerComponent.tsx';
import ScrollableTimePicker from '../scrollableTimePicker/ScrollableTimePicker.tsx';

const AddEventBottomSheetContent = () => {
  const [dateRange, setDateRange] = useState<{
    start?: Date;
    end?: Date;
  }>({ start: undefined, end: undefined });
  const { start, end } = dateRange;

  const handleDateChange = (
    update: [Date | null | undefined, Date | null | undefined],
  ) => {
    console.log('update:', update);
    let [selectedStartDate, selectedEndDate] = update; // selectedEndDate는 null 또는 유효한 두 번째 날짜

    // 타입 변환 null -> undefined
    if (selectedStartDate === null) {
      selectedStartDate = undefined;
    }
    if (selectedEndDate === null) {
      selectedEndDate = undefined;
    }

    let finalStartDate = start;
    let finalEndDate = end;

    if (start === undefined && end === undefined) {
      // 첫 번째 날짜 선택 시
      finalStartDate = selectedStartDate;
      finalEndDate = undefined;
      console.log('처음 날짜를 선택했을 때');
    } else if (start !== undefined && end === undefined) {
      // 두 번째 날짜를 선택 시
      if (selectedStartDate !== undefined && selectedStartDate < start) {
        // 새로운 날짜가 첫 번째 날짜보다 이전일 때
        finalStartDate = selectedStartDate;
        finalEndDate = start;
        console.log('두 번째 선택된 날짜가 첫 번째 선택된 날짜보다 이전일 때');
      } else {
        // 새로운 날짜가 첫 번째 날짜 이후 또는 동일할 때
        finalStartDate = start;
        finalEndDate = selectedEndDate;
        console.log(
          '두 번째 선택된 날짜가 첫 번째 선택된 날짜 이후 또는 같은 날짜일 때',
        );
      }
    } else if (start !== null && end !== null) {
      // 이미 날짜 범위가 선택된 상태에서 새로운 선택을 시작할 때
      finalStartDate = selectedStartDate;
      finalEndDate = undefined;
      console.log('날짜 범위를 재설정하고 새로운 첫 번째 날짜를 선택했을 때');
    }

    // dateRange 상태 업데이트
    setDateRange({
      start: finalStartDate,
      end: finalEndDate,
    });

    // tripData 날짜 상태 업데이트
    // setTripData((prev) => ({
    //   ...prev,
    //   start_date: finalStartDate,
    //   end_date: finalEndDate,
    // }));
  };
  return (
    <>
      <DatePickerComponent onChange={handleDateChange} />
      <ScrollableTimePicker />
    </>
  );
};

export default AddEventBottomSheetContent;
