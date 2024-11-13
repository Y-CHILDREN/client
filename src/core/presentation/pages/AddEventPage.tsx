import EventInput from '../components/eventInput/EventInput.tsx';
import AddEventHeader from '../components/addEventHeader/AddEventHeader.tsx';
import AddEventCalenderInput from '../components/addEventCalenderInput/AddEventCalenderInput.tsx';
import AddEventCostInput from '../components/addEventCostInput/AddEventCostInput.tsx';
import AddEventPostButton from '../components/addEventPostButton/AddEventPostButton.tsx';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import RequiredDot from '../components/requiredDot/RequiredDot.tsx';

interface FormValues {
  eventName: string;
  location: string;
  schedule: Date;
  costCategory: string;
  costValue: number;
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
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const [locationValue, setLocationValue] = useState<Option | null>(null);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

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
    console.log(data);
  };

  return (
    <>
      <AddEventHeader message="이벤트 추가하기" />
      <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col w-full h-full px-[20px] py-[20px] gap-[24px]">
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
                      width: '100%',
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
          <AddEventCalenderInput />
          <AddEventCostInput register={register} setValue={setValue} />
          <div className="mt-auto">
            <AddEventPostButton text="추가 완료" />
          </div>
        </section>
      </form>
    </>
  );
};

export default AddEventPage;
