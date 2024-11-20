import React, { useEffect, useRef } from 'react';
import { GoogleMap } from '@react-google-maps/api';

interface Cost {
  category: string;
  cost: number;
}

interface TripEvent {
  trip_event_id: number;
  trip_id: number;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  cost: Cost[];
  latitude?: number;
  longitude?: number;
  place_image?: string;
}

interface MapWithMarkersProps {
  events: TripEvent[];
  mapCenter: google.maps.LatLngLiteral;
  mapContainerStyle: { width: string; height: string };
  setSelectedEvent: (event: TripEvent) => void;
}

const MapWithMarkers: React.FC<MapWithMarkersProps> = ({
  events,
  mapCenter,
  mapContainerStyle,
  setSelectedEvent,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(() => {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => (marker.map = null));
    markersRef.current = [];

    // Create new markers
    events.forEach((event, index) => {
      if (event.latitude && event.longitude) {
        const markerElement = document.createElement('div');
        markerElement.innerHTML = `
          <div style="
            background-color: #3ACC97;
            color: white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
          ">
            ${index + 1}
          </div>
        `;

        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: mapRef.current,
          position: { lat: event.latitude, lng: event.longitude },
          content: markerElement,
          title: event.title,
        });

        marker.addListener('gmp-click', () => {
          setSelectedEvent(event);
        });

        markersRef.current.push(marker);
      }
    });
  }, [events, setSelectedEvent]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapId: 'MY_MAP_ID', // 참고: https://developers.google.com/maps/documentation/get-map-id?hl=ko#create-a-map-id
        disableDefaultUI: true,
      }}
    >
      {/* Markers are added via useEffect */}
    </GoogleMap>
  );
};

export default MapWithMarkers;
