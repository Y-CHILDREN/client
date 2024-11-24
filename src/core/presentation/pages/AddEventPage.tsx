import EventInput from '../components/eventInput/EventInput.tsx';
import AddEventCalenderInput from '../components/addEventCalenderInput/AddEventCalenderInput.tsx';
import AddEventCostInput from '../components/addEventCostInput/AddEventCostInput.tsx';
import AddEventPostButton from '../components/addEventPostButton/AddEventPostButton.tsx';
import RequiredDot from '../components/requiredDot/RequiredDot.tsx';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import BottomSheet from '../components/bottomSheet/BottomSheet.tsx';
import AddEventBottomSheetContent from '../components/addEventBottomSheetContent/AddEventBottomSheetContent.tsx';
import AddEventHeader from '../components/addEventHeader/addEventHeader.tsx';

import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createTripEvent } from '../../data/infrastructure/services/eventService.ts';
import { useUserTripEventStore } from '../hooks/stores/userTripEventStore.ts';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

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

interface Option {
  label: string;
  value: {
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
  };
}

const AddEventPage: React.FC = () => {
  const methods = useForm<FormValues>();
  const { register, handleSubmit, setValue, watch, getValues } = methods;

  const [locationValue, setLocationValue] = useState<Option | null>(null);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
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

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (
        !window.google &&
        !document.querySelector('script[src*="maps.googleapis.com/maps/api"]')
      ) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => setIsScriptLoaded(true);
        document.head.appendChild(script);
      } else {
        setIsScriptLoaded(true);
      }
    };

    loadGoogleMapsScript();

    return () => {
      const script = document.querySelector(
        'script[src*="maps.googleapis.com/maps/api"]',
      );
      if (script) script.remove();
    };
  }, [googleMapsApiKey]);

  const handleLocationSelect = (newValue: Option | null) => {
    setLocationValue(newValue);
    if (newValue) setValue('location', newValue.label);
  };

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
              {isScriptLoaded && (
                <GooglePlacesAutocomplete
                  apiKey={googleMapsApiKey}
                  selectProps={{
                    value: locationValue,
                    onChange: handleLocationSelect,
                    placeholder: '주소 검색',
                    styles: {
                      container: (provided) => ({
                        ...provided,
                        width: '380px',
                      }),
                      control: (provided) => ({
                        ...provided,
                        height: '50px',
                        borderColor: '#E5E7EB',
                        '&:hover': {
                          borderColor: '#9CA3AF',
                        },
                      }),
                      input: (provided) => ({
                        ...provided,
                        fontSize: '15px',
                      }),
                      option: (provided) => ({
                        ...provided,
                        fontSize: '15px',
                      }),
                    },
                  }}
                  autocompletionRequest={{
                    componentRestrictions: { country: 'kr' },
                  }}
                />
              )}
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
