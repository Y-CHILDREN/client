import React, { useState, useEffect } from 'react';

import DatePickerComponent from '../datePicker/DatePickerComponent.tsx';
import TripData from '../../../domain/entities/trip.ts';
import DropDown from '../dropDown/DropDown.tsx';

interface Props {
  onClose: () => void;
}

const CreateTrip: React.FC<Props> = ({ onClose }) => {
  // Multi-Step status
  const [step, setStep] = useState(1);

  // DatePicker status
  const [dateRange, setDateRange] = useState<{
    start?: Date;
    end?: Date;
  }>({ start: undefined, end: undefined });
  const { start, end } = dateRange;

  // Destination dropDown status
  // Region 타입 정의.
  type Region = 'domestic' | 'overseas';

  const [region, setRegion] = useState<Region | ''>('');
  const [subregion, setSubregion] = useState('');

  const regions: Array<{ label: string; value: string }> = [
    { label: '국내', value: 'domestic' },
    { label: '국외', value: 'overseas' },
  ];

  const subregions: Record<Region, Array<{ label: string; value: string }>> = {
    domestic: [
      { label: '서울', value: 'seoul' },
      { label: '부산', value: 'busan' },
    ],
    overseas: [
      { label: '일본', value: 'japan' },
      { label: '중국', value: 'china' },
    ],
  };

  const subregionOptions = region ? subregions[region] : [];

  // Data status
  const [tripData, setTripData] = useState<TripData>({
    title: '',
    destination: '',
    start_date: undefined,
    end_date: undefined,
    member: '',
  });

  // logging
  useEffect(() => {
    console.log('Updated dateRange:', dateRange);
    console.log('start:', start);
    console.log('end:', end);
    console.log('Updated tripData:', tripData);
  }, [tripData, dateRange, start, end]);

  // next 멀티스탭 핸들러.
  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  // previous 멀티스탭 핸들러.
  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  // tripData 핸들러.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTripData((prev) => ({ ...prev, [name]: value }));
  };

  // datePicker 핸들러.
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

    // tripData 상태 업데이트
    setTripData((prev) => ({
      ...prev,
      start_date: finalStartDate,
      end_date: finalEndDate,
    }));
  };

  // 폼 제출 핸들러.
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Creating trip: ', tripData);
    // 여기에서 생성 로직을 추가 또는 API 호출.
  };

  // enter로 다음 스텝 이동 핸들러.
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13) {
      // 엔터 키 코드
      event.preventDefault(); // 기본 제출 동작 방지
      if (step < 4) {
        handleNextStep(); // 다음 스텝으로 이동
      } else {
        handleSubmit(event as unknown as React.FormEvent); // 마지막 스텝에서는 폼 제출
      }
    }
  };

  // 닫기 핸들러.
  const handleClose = () => {
    onClose();
  };

  // 목적지 선택 핸들러.
  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = event.target.value as Region | '';
    setRegion(newRegion);
    if (!newRegion) {
      setSubregion('');
    }
  };

  const handleSubregionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSubregion(event.target.value);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <button onClick={handleClose} className="mb-4">
          <span className="text-xl font-semibold">X</span>
        </button>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (step === 4) {
            handleSubmit(event);
          }
        }}
      >
        {step === 1 && (
          <div>
            <h2>여행 이름을 적어주세요.</h2>
            <input
              type="text"
              name="title"
              value={tripData.title}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="여행 제목을 입력하세요"
              className="border rounded p-2"
            />
            <button type="button" onClick={handleNextStep} className="ml-2">
              다음
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2>목적지를 입력하세요.</h2>
            <div className="flex justify-center">
              <DropDown
                label="Region"
                value={region}
                onChange={handleRegionChange}
                options={regions}
                placeholder="국내/해외"
                className="mx-3"
              />
              <DropDown
                label="Subregion"
                value={subregion}
                onChange={handleSubregionChange}
                options={
                  subregionOptions.length > 0
                    ? subregionOptions
                    : [{ label: '국내/해외 옵션을 선택하세요', value: '' }]
                }
                placeholder="국가/도시 선택"
              />
            </div>
            <button type="button" onClick={handlePreviousStep} className="ml-2">
              이전
            </button>
            <button type="button" onClick={handleNextStep} className="ml-2">
              다음
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            <div>
              <h2>여행 일정을 선택해주세요.</h2>
              <DatePickerComponent
                startDate={start}
                endDate={end}
                minDate={new Date()}
                onChange={handleDateChange}
                inline={true}
                showMonthDropdown={true}
                showYearDropdown={true}
              />
            </div>
            <button type="button" onClick={handlePreviousStep} className="ml-2">
              이전
            </button>
            <button type="button" onClick={handleNextStep} className="ml-2">
              다음
            </button>
          </div>
        )}
        {step === 4 && (
          <div>
            <h2>누구와 함께 가나요?</h2>
            <input
              type="text"
              name="member"
              value={tripData.member}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="같이 여행할 친구를 추가하세요."
              className="border rounded p-2"
            />
            <button type="button" onClick={handlePreviousStep} className="ml-2">
              이전
            </button>
            <button type="submit" className="ml-2">
              여행 생성
            </button>
            {/* 여행 생성 마지막 단계가 끝난 후 생성된 여행의 여행 디테일 페이지로 연결. */}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateTrip;
