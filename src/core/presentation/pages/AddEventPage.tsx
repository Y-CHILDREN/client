import AddEventCalenderInput from '../components/addEventCalenderInput/AddEventCalenderInput.tsx';
import AddEventCostInput from '../components/addEventCostInput/AddEventCostInput.tsx';
import AddEventPostButton from '../components/addEventPostButton/AddEventPostButton.tsx';
import EventNameInput from '../components/eventNameInput/EventNameInput.tsx';
import BottomSheet from '../components/bottomSheet/BottomSheet.tsx';
import AddEventBottomSheetContent from '../components/addEventBottomSheetContent/AddEventBottomSheetContent.tsx';
import AddEventHeader from '../components/addEventHeader/addEventHeader.tsx';
import AddEventGoogleLocationInput from '../components/addEventGoogleLocationInput/AddEventGoogleLocationInput.tsx';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createTripEvent } from '../../data/infrastructure/services/eventService.ts';
import { useUserTripEventStore } from '../hooks/stores/userTripEventStore.ts';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
  const schema = z.object({
    eventName: z.string().min(1, '이벤트 이름은 필수입니다.'),
    location: z.string().min(1, '장소 정보는 필수입니다.'),
    cost: z.array(
      z.object({
        category: z.string().min(1, '비용 항목을 입력해 주세요.'),
        cost: z.number().min(0, '비용은 0 이상이어야 합니다.'),
      }),
    ),
    dateRange: z
      .object({
        start: z.date().refine((val) => val !== undefined, {
          message: '시작 날짜는 필수입니다.',
        }),
        end: z.date().refine((val) => val !== undefined, {
          message: '종료 날짜는 필수입니다.',
        }),
      })
      .refine((data) => data.start && data.end, {
        message: '시작 날짜와 종료 날짜는 필수입니다.',
      })
      .refine(
        (data) => (data.start && data.end ? data.start < data.end : true),
        {
          message: '시작 날짜는 종료 날짜보다 앞서야 합니다.',
        },
      ),
  });

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;

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
      <AddEventHeader message="이벤트 추가하기" />
      <form className="w-full h-[90%]" onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col w-full bg-white h-full px-[20px] pt-[20px] gap-[14px]">
          <EventNameInput
            register={register}
            id="eventName"
            label="이벤트 이름"
            inputText="이벤트 이름을 입력해 주세요."
            errors={errors}
          />
          <AddEventGoogleLocationInput setValue={setValue} errors={errors} />
          <AddEventCalenderInput
            openBottomSheet={bottomSheetHandler}
            dateRange={dateRange}
            errors={errors}
          />
          <AddEventCostInput
            register={register}
            setValue={setValue}
            getValues={watch}
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
    </FormProvider>
  );
};

export default AddEventPage;
