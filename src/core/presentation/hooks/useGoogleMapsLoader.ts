import { useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useGoogleMapsStore } from './stores/googleMapsStore.ts';
import { GOOGLE_MAP_LIBRARIES } from './stores/constants';

export const useGoogleMapsLoader = () => {
  const setLoaded = useGoogleMapsStore((state) => state.setLoaded);
  const setError = useGoogleMapsStore((state) => state.setError);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: GOOGLE_MAP_LIBRARIES,
    version: 'beta',
    language: 'ko',
  });

  useEffect(() => {
    setLoaded(isLoaded);
    setError(!!loadError);
  }, [isLoaded, loadError, setLoaded, setError]);

  return { isLoaded, loadError };
};
