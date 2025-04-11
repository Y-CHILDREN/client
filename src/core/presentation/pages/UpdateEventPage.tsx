import { EventCalenderInput } from '../components/event/eventCalenderInput/EventCalenderInput.tsx';
import { BottomSheet } from '../components/bottomSheet/BottomSheet.tsx';
import { EventGoogleLocationInput } from '../components/event/eventGoogleLocationInput/EventGoogleLocationInput.tsx';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {
  getTripEvent,
  updateTripEvent,
} from '../../data/infrastructure/services/eventService.ts';

import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import { Cost, FormValues } from './AddEventPage.tsx';
import { useQuery } from '@tanstack/react-query';
import { EventCostInput } from '../components/event/eventCostInput/EventCostInput.tsx';
import { EventBottomSheetContent } from '../components/event/eventBottomSheetContent/EventBottomSheetContent.tsx';
import { EventHeader } from '../components/event/eventHeader/EventHeader.tsx';
import { EventNameInput } from '../components/event/eventNameInput/EventNameInput.tsx';
import { EventSubmitButton } from '../components/event/eventSubmitButton/EventSubmitButton.tsx';
import { Helmet } from 'react-helmet-async';

const UpdateEventPage = () => {
  const { eventId } = useParams();
  const parsedEventId = Number(eventId);
  const { data, isLoading } = useQuery({
    queryKey: ['tripEvent', eventId],
    queryFn: () => getTripEvent(parsedEventId),
  });

  const schema = z.object({
    eventName: z.string().min(1, '이벤트 이름은 필수입니다.'),
    location: z.string().min(1, '장소 정보는 필수입니다.'),
    cost: z.array(
      z.object({
        category: z.string().min(1, '비용 항목을 입력해 주세요.'),
        value: z.number().min(0, '비용은 0 이상이어야 합니다.'),
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
    defaultValues: isLoading
      ? undefined
      : {
          eventName: data?.event_name || '',
          location: data?.location || '',
          cost: data?.cost || [],
          dateRange: {
            start: data?.start_date ? new Date(data.start_date) : undefined,
            end: data?.end_date ? new Date(data.end_date) : undefined,
          },
        },
  });

  // useEffect를 사용하여 데이터가 로드되면 methods 값 재설정
  useEffect(() => {
    if (data) {
      methods.reset({
        eventName: data.event_name || '',
        location: data.location || '',
        cost: data.cost || [],
        dateRange: {
          start: data.start_date ? new Date(data.start_date) : undefined,
          end: data.end_date ? new Date(data.end_date) : undefined,
        },
      });
    }
  }, [data, methods.reset, methods]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const navigate = useNavigate();

  const updateEventMutation = useMutation({
    mutationFn: updateTripEvent,
    onSuccess: (data) => {
      console.log(data);
      navigate('/trip-detail');
    },
    onError: (err) => {
      console.log('이벤트 수정 중 오류가 발생했습니다:', err);
    },
  });

  const onSubmit = (submitData: FormValues) => {
    const updateEventData = {
      ...submitData,
      // undefined일 경우 null로 변환
      tripId: data?.trip_id ?? null,
    };

    updateEventMutation.mutate({
      eventId: data?.event_id,
      data: updateEventData,
    });
  };

  const bottomSheetHandler = () => setIsBottomSheetOpen(true);

  const dateRange = watch('dateRange');

  return (
    <>
      <Helmet>
        {/* og - open graph로 facebook에서 만든 방식으로 sns에서 웹페이지가 게시될 때 표시할 정보를 명시 */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="이벤트 수정" />
        <meta
          property="og:description"
          content="이벤트 정보를 수정하고 여행 계획을 최적화하세요."
        />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_API_URL}/update-event`}
        />
        <meta property="og:type" content="website" />
        <meta name="title" content="이벤트 수정" />
        <meta
          name="keywords"
          content="여행, 이벤트 수정, 일정 관리, Trip Planner"
        />
        <meta
          name="description"
          content="이벤트 정보를 수정하고 여행 계획을 최적화하세요."
        />
      </Helmet>

      <FormProvider {...methods}>
        <EventHeader message="이벤트 수정하기" />
        <form className="w-full h-[90%]" onSubmit={handleSubmit(onSubmit)}>
          <section className="flex flex-col w-full bg-white h-full px-[20px] pt-[20px] gap-[14px]">
            <EventNameInput
              register={register}
              id="eventName"
              label="이벤트 이름"
              inputText="수정할 이벤트 이름을 입력해 주세요."
              errors={errors}
            />
            <EventGoogleLocationInput
              setValue={setValue}
              errors={errors}
              defaultLocation={data?.location} // 기본값 전달
            />
            <EventCalenderInput
              openBottomSheet={bottomSheetHandler}
              dateRange={dateRange}
              errors={errors}
            />
            <EventCostInput
              register={register}
              setValue={setValue}
              getValues={watch}
              defaultCosts={data?.cost as Cost[] | undefined} // 기본값 전달
            />
            <EventSubmitButton
              text={updateEventMutation.isPending ? '수정중...' : '수정 완료'}
              disabled={updateEventMutation.isPending}
            />
          </section>
          <BottomSheet
            isOpen={isBottomSheetOpen}
            onClose={() => setIsBottomSheetOpen(false)}
          >
            <EventBottomSheetContent />
          </BottomSheet>
        </form>
      </FormProvider>
    </>
  );
};

export default UpdateEventPage;
