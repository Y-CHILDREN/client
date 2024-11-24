import EventInput from '../components/eventInput/EventInput.tsx';
import AddEventCalenderInput from '../components/addEventCalenderInput/AddEventCalenderInput.tsx';
import AddEventCostInput from '../components/addEventCostInput/AddEventCostInput.tsx';
import AddEventPostButton from '../components/addEventPostButton/AddEventPostButton.tsx';
import RequiredDot from '../components/requiredDot/RequiredDot.tsx';
import BottomSheet from '../components/bottomSheet/BottomSheet.tsx';
import AddEventBottomSheetContent from '../components/addEventBottomSheetContent/AddEventBottomSheetContent.tsx';
import AddEventHeader from '../components/addEventHeader/addEventHeader.tsx';
import AddEventGoogleLocation from '../components/addEventGoogleLocation/AddEventGoogleLocation.tsx';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createTripEvent } from '../../data/infrastructure/services/eventService.ts';
import { useUserTripEventStore } from '../hooks/stores/userTripEventStore.ts';
import { useNavigate } from 'react-router-dom';

export interface Cost {
  category: string;
  cost: number;
}

export interface FormValues {
  tripId: number | null;
  eventName: string;
  location: string;
  cost: Cost[];
  dateRange: { start?: Date; end?: Date };
}

const AddEventPage: React.FC = () => {
  const methods = useForm<FormValues>();
  const { register, handleSubmit, setValue, watch, getValues } = methods;

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const selectedTripId = useUserTripEventStore((state) => state.selectedTripId);
  const navigate = useNavigate();

  const addEventMutation = useMutation({
    mutationFn: createTripEvent,
    onSuccess: () => {
      console.log('이벤트가 성공적으로 추가되었습니다.');
      navigate('/trip-detail');
    },
    onError: (error) => {
      console.error('이벤트 추가 중 오류가 발생했습니다:', error);
    },
  });

  const onSubmit = (data: FormValues) => {
    const dataAddTripId = {
      ...data,
      tripId: selectedTripId,
    };
    addEventMutation.mutate(dataAddTripId);
  };

  const bottomSheetHandler = () => setIsBottomSheetOpen(true);

  const dateRange = watch('dateRange');

  return (
    <FormProvider {...methods}>
      <>
        <AddEventHeader message="이벤트 추가하기" />
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <section className="flex flex-col w-full h-[624px] px-[20px] pt-[20px] gap-[14px]">
            <EventInput
              register={register}
              id="eventName"
              label="이벤트 이름"
              inputText="이벤트 이름을 입력해 주세요."
            />
            <div className="flex flex-col w-full gap-2">
              <div className="flex float-start">
                <label className="">장소</label>
                <RequiredDot />
              </div>
              <AddEventGoogleLocation setValue={setValue} />
              <input type="hidden" {...register('location')} />
            </div>
            <AddEventCalenderInput
              openBottomSheet={bottomSheetHandler}
              data={dateRange}
            />
            <AddEventCostInput
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
            <AddEventPostButton
              text={addEventMutation.isPending ? '추가 중...' : '추가 완료'}
              disabled={addEventMutation.isPending}
            />
          </section>
          <BottomSheet
            isOpen={isBottomSheetOpen}
            onClose={() => setIsBottomSheetOpen(false)}
          >
            <AddEventBottomSheetContent />
          </BottomSheet>
        </form>
      </>
    </FormProvider>
  );
};

export default AddEventPage;
