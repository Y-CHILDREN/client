import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { UseFormSetValue } from 'react-hook-form';
import { FormValues } from '../../pages/AddEventPage.tsx';
import RequiredDot from '../requiredDot/RequiredDot.tsx';

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

interface AddEventGoogleLocationProps {
  setValue: UseFormSetValue<FormValues>;
}

const AddEventGoogleLocation: React.FC<AddEventGoogleLocationProps> = ({
  setValue,
}) => {
  const [locationValue, setLocationValue] = useState<Option | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const handleLocationSelect = (newValue: Option | null) => {
    setLocationValue(newValue);
    if (newValue) setValue('location', newValue.label);
  };

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

  return (
    <>
      <div className="flex float-start">
        <p className="">장소</p>
        <RequiredDot />
      </div>
      {isScriptLoaded && (
        <GooglePlacesAutocomplete
          debounce={500}
          apiKey={googleMapsApiKey}
          selectProps={{
            value: locationValue,
            onChange: handleLocationSelect,
            placeholder: '주소 입력',
            components: {
              DropdownIndicator: null, // 드롭다운 버튼 제거
            },
            styles: {
              container: (provided) => ({
                ...provided,
                width: '100%',
                textAlign: 'left',
                border: '2px, solid',
                borderColor: '#e5e7eb',
                borderRadius: '0.375rem',
              }),
              control: (provided) => ({
                ...provided,
                height: '50px',
                border: 'none',
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
    </>
  );
};

export default AddEventGoogleLocation;
