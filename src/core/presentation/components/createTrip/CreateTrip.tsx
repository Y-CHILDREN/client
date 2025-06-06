import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { X } from 'lucide-react';
import Avatar from 'react-avatar';

import { CreatedTrip } from '../../../domain/entities/trip.ts';
import User from '../../../domain/entities/user.ts';
import {
  regions,
  subregions,
  Region,
} from '../../../domain/entities/regions.ts';
import DatePickerComponent from '../datePicker/DatePickerComponent.tsx';
import DropDown from '../dropDown/DropDown.tsx';
import SearchInputComponent from '../Search/SearchInputComponent.tsx';
import useTripStore from '../../hooks/stores/tripStore.ts';
import { useAuthStore } from '../../hooks/stores/authStore.ts';
import { useUserTripStore } from '../../hooks/stores/userTripStore.ts';

interface Props {
  onClose: () => void;
  onSubmit: () => void;
}

const CreateTrip: React.FC<Props> = ({ onClose, onSubmit }) => {
  // Multi-Step status
  const { step, setStep } = useTripStore();

  const apiUrl = import.meta.env.VITE_API_URL;

  // User
  const { user } = useAuthStore();

  // DatePicker status
  const [dateRange, setDateRange] = useState<{
    start?: Date;
    end?: Date;
  }>({ start: undefined, end: undefined });
  const { start, end } = dateRange;

  // Destination dropDown status
  const [region, setRegion] = useState<Region | ''>('');
  const [subregion, setSubregion] = useState('');

  const subregionOptions = region ? subregions[region] : [];

  // Data status
  const [tripData, setTripData] = useState<CreatedTrip>({
    title: '',
    destination: '',
    start_date: undefined,
    end_date: undefined,
    members: user ? [user.email] : [],
    created_by: user?.email || '',
  });

  // member status
  const [members, setMembers] = useState<User[]>(user ? [user] : []);

  // error message
  const [errors, setErrors] = useState<{ [key in keyof CreatedTrip]?: string }>(
    {},
  );

  const { setUserTripData } = useUserTripStore();

  // logging
  useEffect(() => {
    // console.log('Updated dateRange:', dateRange);
    // console.log('start:', start);
    // console.log('end:', end);
    // console.log('members:', members);
    console.log('Updated tripData:', tripData);
  }, [tripData, dateRange, start, end, members, step, errors]);

  // 사용자 정보가 없을 경우 처리(로그인 단계에서 유저 정보 확인)
  useEffect(() => {
    if (!user) {
      throw new Error('로그인 상태가 아닙니다.');
    }
  }, [user]);

  // tripData와 members 동기화
  useEffect(() => {
    setTripData((prev) => ({
      ...prev,
      members: members.map((member) => member.email),
    }));
  }, [members]);

  // 유효성 검사 함수
  const validateFields = () => {
    const newErrors: { [key in keyof CreatedTrip]?: string } = {};

    if (step === 1) {
      if (!tripData.destination) newErrors.destination = '목적지를 입력하세요.';
    } else if (step === 2) {
      if (!tripData.start_date)
        newErrors.start_date = '시작 날짜를 선택하세요.';
      if (!tripData.end_date) newErrors.end_date = '종료 날짜를 선택하세요.';
    } else if (step === 3) {
      if (tripData.members.length === 0)
        newErrors.members = '적어도 한 명의 멤버를 추가하세요. (본인은 필수)';
    } else if (step === 4) {
      if (!tripData.title.trim()) newErrors.title = '제목을 입력하세요.';
    }

    setErrors(newErrors);
    console.log('newErrors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // next 멀티스탭 핸들러.
  const handleNextStep = () => {
    if (validateFields()) {
      console.log('다음 단계');
      setStep('next');
    }
  };

  // previous 멀티스탭 핸들러.
  const handlePreviousStep = () => {
    console.log('이전 단계');
    setStep('previous');
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

    // tripData 날짜 상태 업데이트
    setTripData((prev) => ({
      ...prev,
      start_date: finalStartDate,
      end_date: finalEndDate,
    }));
  };

  // enter로 다음 스텝 이동 핸들러.
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
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
    setSubregion('');

    // region 재선택시 목적지 값 초기화.
    setTripData((prev) => ({
      ...prev,
      destination: '',
    }));
  };

  const handleSubregionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newSubregion = event.target.value;
    setSubregion(newSubregion);

    // subregion 선택 시 tripData.destination 업데이트
    setTripData((prev) => ({
      ...prev,
      destination: `${region === 'domestic' ? 'domestic' : 'overseas'} ${newSubregion}`,
    }));
  };

  // 멤버 추가 핸들러.
  const handleAddMember = (users: User[]) => {
    if (!user) {
      return <Navigate to="/login" replace />; // 리다이렉션 처리
    }

    // console.log('users:', users);
    setMembers((prevMembers) => {
      const newMembers = [...prevMembers, ...users].filter(
        (member, index, array) =>
          array.findIndex((m) => m.email === member.email) === index,
      );

      // 작성자 이메일 유지
      const ensuredMembers = newMembers.some(
        (member) => member.email === user.email,
      )
        ? newMembers
        : [user!, ...newMembers];

      // 여행 정보 업데이트
      setTripData((prev) => ({
        ...prev,
        members: ensuredMembers.map((member) => member.email),
      }));
      return ensuredMembers;
    });
  };

  // 멤버 제거 핸들러.
  const handleRemoveMember = (email: string) => {
    if (!user) {
      return <Navigate to="/login" replace />; // 리다이렉션 처리
    }

    // 작성자는 제거되지 않도록 필터링
    setMembers((prev) => {
      const updatedMembers = prev.filter(
        (member) => member.email !== email || member.email === user.email,
      );

      // 여행 정보 업데이트
      setTripData((prev) => ({
        ...prev,
        members: updatedMembers.map((member) => member.email),
      }));
      return updatedMembers;
    });
  };

  // 전체 멤버 제거 핸들러.
  const handleClearAllMembers = () => {
    if (user) {
      // 작성자만 유지
      setMembers([user]); // 빈 배열로 선언.

      // tripData.members도 초기화
      setTripData((prev) => ({
        ...prev,
        members: [user.email],
      }));
    }
  };

  // 폼 제출 핸들러.
  const handleSubmit = async (event: React.FormEvent) => {
    if (validateFields()) {
      event.preventDefault();

      // formatting
      const tripDetails = {
        title: tripData.title,
        destination: tripData.destination,
        start_date: tripData.start_date,
        end_date: tripData.end_date,
        members: members.map((member) => member.email), // 이메일만 전송.
        created_by: user?.email,
      };

      // 서버 전송.
      try {
        const response = await axios.post(`${apiUrl}/trips/`, tripDetails);
        console.log('Trip created:', response.data);
        onSubmit();

        if (user) {
          const updatedTripsData = await axios.get(
            `${apiUrl}/trips/user/${user.id}`,
          );
          setUserTripData(updatedTripsData.data);
        }
      } catch (error) {
        console.error('Error creating trip:', error);
      }
    }
  };

  return (
    <div className="w-full h-full bg-white min-h-[600px] flex flex-col">
      <div className="relative flex items-center p-4 border-b">
        <button
          onClick={handleClose}
          className="absolute p-2 transition-colors rounded-full left-4 hover:bg-gray-50"
        >
          <X className="w-4 h-4 text-gray-600" />
          <span className="sr-only">닫기</span>
        </button>
        <h1 className="w-full text-lg font-medium text-center">
          여행 추가하기
        </h1>
      </div>

      <div
        style={{ width: `${(step / 4) * 100}%` }} // 진행도 표시
        className="h-0.5 bg-[#92e7c5] rounded transition-all duration-1000 w-full"
      />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (step === 4) {
            handleSubmit(event);
          }
        }}
        className="flex flex-col flex-1"
      >
        {step === 1 && (
          <div className="flex flex-col flex-1 p-6">
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <span className="text-xl font-medium">어디로 떠나시나요?</span>
                <span className="text-[#17B47B] text-sm">필수</span>
              </div>
              <div className="flex gap-3">
                <DropDown
                  label="Region"
                  value={region}
                  onChange={handleRegionChange}
                  options={regions}
                  placeholder="국내/해외"
                  className="flex-1"
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
                  className="flex-1"
                />
              </div>
            </div>

            {errors.destination && (
              <p className="mt-2 text-sm text-red-500">{errors.destination}</p>
            )}
            <div className="mt-auto">
              {/* 선택한 여행지 표시 */}
              {region && subregion ? (
                <div className="flex flex-col px-5 py-3 justify-center items-start gap-3 self-stretch rounded-[8px] bg-[#FBFBFB] mt-auto mb-4 border border-[#EDEEEF]">
                  <div className="flex flex-col justify-center items-start gap-3 self-stretch">
                    <span className="text-[#151616] text-center font-semibold text-sm leading-5">
                      선택한 여행지
                    </span>
                    <div>
                      <button
                        onClick={() => setSubregion('')}
                        className="flex h-9 pt-0 pr-3 pb-0 pl-4 justify-center items-center text-center gap-1 rounded-[160px] bg-[#E9F6F1]"
                      >
                        <span className="text-[#151616] text-center font-semibold text-sm leading-5">
                          {
                            subregionOptions.find(
                              (option) => option.value === subregion,
                            )?.label
                          }
                        </span>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={step < 4 ? handleNextStep : undefined}
                  className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                    step === 1 && region && subregion
                      ? 'bg-[#3ACC97] text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col flex-1 p-6">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xl font-medium">
                  여행 일정을 선택해 주세요
                </span>
                <span className="text-[#17B47B] text-sm">필수</span>
              </div>
              <DatePickerComponent
                startDate={start}
                endDate={end}
                minDate={new Date()}
                onChange={handleDateChange}
                inline={true}
                showMonthDropdown
                showYearDropdown
                className="w-full"
              />
            </div>

            <div className="mt-auto">
              {errors.end_date && (
                <p className="mt-2 text-sm text-red-500">{errors.end_date}</p>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="px-4 py-3 text-gray-900 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
                  style={{ flex: 1 }}
                >
                  이전
                </button>
                <button
                  type="button"
                  onClick={step < 4 ? handleNextStep : undefined}
                  style={{ flex: 2 }}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    step === 2 && start && end
                      ? 'bg-[#3ACC97] text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col flex-1 p-6">
            <div className="flex-1 pae-y-6">
              <div className="flex flex-col mb-4 space-y-2 text-left">
                <span className="text-xl font-medium">누구와 함께 가나요?</span>
                <span className="text-sm text-gray-500">
                  일행을 추가하면 여행 계획을 실시간으로 공유할 수 있어요!
                </span>
              </div>
              <div className="relative mb-4">
                <SearchInputComponent
                  onMembersSelected={handleAddMember}
                  onRemoveMember={handleRemoveMember}
                  selectedMembers={members}
                  placeholder="이메일로 친구 검색"
                />
              </div>
              <div className="flex justify-end mb-1">
                <button
                  onClick={handleClearAllMembers}
                  className="px-3 py-1 text-sm text-gray-600 transition-colors rounded hover:text-gray-800 hover:bg-gray-100"
                >
                  전체 삭제
                </button>
              </div>
              <div className="space-y-2 overflow-y-auto max-h-60">
                {members.map((member) => (
                  <div
                    key={member.email}
                    className="flex items-center justify-between p-1 bg-white border rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar
                        src={member.user_image}
                        name={member.nickname}
                        size="28"
                        round
                        className="flex-shrink-0"
                      />
                      <span className="text-sm font-medium">
                        {member.nickname}{' '}
                        <span className="text-gray-500">({member.email})</span>
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(member.email)}
                      className="p-1 text-gray-400 transition-colors rounded-full hover:text-red-600 hover:bg-red-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto">
              {errors.members && (
                <p className="mt-2 text-sm text-red-500">{errors.members}</p>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="px-4 py-3 text-gray-900 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
                  style={{ flex: 1 }}
                >
                  이전
                </button>
                <button
                  type="button"
                  onClick={step < 4 ? handleNextStep : undefined}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    step === 3 && members.length > 0
                      ? 'bg-[#3ACC97] text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  style={{ flex: 2 }}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col flex-1 p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xl font-medium">
                  마지막으로 여행의 이름을 적어 주세요.
                </span>
                <span className="text-[#17B47B] text-sm">필수</span>
              </div>
              <input
                type="text"
                name="title"
                value={tripData.title}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="예) 제주도 가족여행"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#92e7c5]"
              />
            </div>

            <div className="mt-auto">
              {errors.title && (
                <p className="mt-2 text-sm text-red-500">{errors.title}</p>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="px-4 py-3 text-gray-900 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
                  style={{ flex: 1 }}
                >
                  이전
                </button>
                <button
                  type="submit"
                  onClick={step < 4 ? handleNextStep : undefined}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    step === 4 && tripData.title
                      ? 'bg-[#3ACC97] text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  style={{ flex: 2 }}
                >
                  여행 저장
                </button>
              </div>
            </div>
          </div>
        )}

        {/*Step Button*/}
        {/*<div className="p-6 mt-auto">*/}
        {/*  <div className="flex gap-3">*/}
        {/*    {step > 1 && (*/}
        {/*      <button*/}
        {/*        type="button"*/}
        {/*        onClick={handlePreviousStep}*/}
        {/*        className="flex-1 px-4 py-3 text-gray-900 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"*/}
        {/*      >*/}
        {/*        이전*/}
        {/*      </button>*/}
        {/*    )}*/}
        {/*    <button*/}
        {/*      type={step === 4 ? 'submit' : 'button'}*/}
        {/*      onClick={step < 4 ? handleNextStep : undefined}*/}
        {/*      className="flex-1 px-4 py-3 bg-[#92e7c5] text-white rounded-lg hover:bg-[#7fceb0] transition-colors"*/}
        {/*    >*/}
        {/*      {step === 4 ? '여행 저장' : '다음'}*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </form>
    </div>
  );
};

export default CreateTrip;
