import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { FormValues } from '../../../pages/AddEventPage.tsx';
import RequiredDot from '../../requiredDot/RequiredDot.tsx';

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

interface EventGoogleLocationProps {
  setValue: UseFormSetValue<FormValues>;
  errors: FieldErrors<FormValues>;
  defaultLocation?: string;
}

const EventGoogleLocationInput: React.FC<EventGoogleLocationProps> = ({
  setValue,
  errors,
  defaultLocation,
}) => {
  const [locationValue, setLocationValue] = useState<Option | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // 기본값 처리를 위한 useEffect 추가
  useEffect(() => {
    if (defaultLocation && isScriptLoaded) {
      // 기본값이 있고 스크립트가 로드되었을 때
      const createOptionFromDefaultLocation = async () => {
        try {
          // Google Places API를 사용하여 위치 세부 정보 가져오기
          const service = new window.google.maps.places.PlacesService(
            document.createElement('div'),
          );

          service.textSearch({ query: defaultLocation }, (results, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              results &&
              results[0]
            ) {
              const place = results[0];
              const newValue: Option = {
                label: place.formatted_address || defaultLocation,
                value: {
                  description: place.formatted_address || defaultLocation,
                  place_id: place.place_id || '',
                  structured_formatting: {
                    main_text: place.name || '',
                    secondary_text: '',
                  },
                },
              };

              setLocationValue(newValue);
              setValue('location', newValue.label, { shouldValidate: true });
            } else {
              // 기본값으로 fallback
              setLocationValue({
                label: defaultLocation,
                value: {
                  description: defaultLocation,
                  place_id: '',
                  structured_formatting: {
                    main_text: defaultLocation,
                    secondary_text: '',
                  },
                },
              });
              setValue('location', defaultLocation, { shouldValidate: true });
            }
          });
        } catch (error) {
          console.error('위치 로드 중 오류:', error);
        }
      };

      createOptionFromDefaultLocation();
    }
  }, [defaultLocation, isScriptLoaded, setValue]);

  const handleLocationSelect = (newValue: Option | null) => {
    setLocationValue(newValue);
    if (newValue)
      setValue('location', newValue.label, { shouldValidate: true });
  };

  // 기존의 스크립트 로드 useEffect
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (
        !window.google &&
        !document.querySelector('script[src*="maps.googleapis.com/maps/api"]')
      ) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places&language=ko&region=KR`;
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

  return (
    <article className="flex-col text-left border-gray-200">
      <div className="flex float-start mb-[10px]">
        <p className="">장소</p>
        <RequiredDot />
      </div>
      {isScriptLoaded && (
        <GooglePlacesAutocomplete
          debounce={500}
          apiOptions={{
            language: 'ko',
            region: 'KR',
          }}
          apiKey={googleMapsApiKey}
          selectProps={{
            value: locationValue,
            onChange: handleLocationSelect,
            placeholder: '주소 입력',
            components: {
              DropdownIndicator: null,
            },
            styles: {
              container: (provided) => ({
                ...provided,
              }),
              control: (provided) => ({
                ...provided,
                width: '100%',
                border: '2px solid #e5e7eb',

                borderRadius: '0.375rem',
                textAlign: 'left',
                height: '50px',
              }),
              input: (provided) => ({
                ...provided,
                autoComplete: 'off',
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

      {errors.location && (
        <p className="mt-2 text-sm text-red-500">위치를 입력해 주세요.</p>
      )}
    </article>
  );
};

export { EventGoogleLocationInput };
