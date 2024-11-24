import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { UseFormSetValue } from 'react-hook-form';
import { FormValues } from '../../pages/AddEventPage.tsx';

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
    </>
  );
};

export default AddEventGoogleLocation;
