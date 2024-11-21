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
  mapCenter?: google.maps.LatLngLiteral;
  mapContainerStyle: { width: string; height: string };
  selectedEvent?: TripEvent | null;
  setSelectedEvent: (event: TripEvent) => void;
}

const MapWithMarkers: React.FC<MapWithMarkersProps> = ({
  events,
  mapCenter,
  mapContainerStyle,
  selectedEvent,
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

  // PanTo 기능 (부드러운 화면 전환)
  const panTo = (lat: number, lng: number) => {
    if (mapRef.current) {
      mapRef.current.panTo(new google.maps.LatLng(lat, lng));
    }
  };

  // selectedEvent에 따라 panTo 기능
  useEffect(() => {
    if (selectedEvent?.latitude && selectedEvent?.longitude) {
      panTo(selectedEvent.latitude, selectedEvent.longitude);
    }
  }, [selectedEvent]);

  // 마커
  useEffect(() => {
    if (!mapRef.current) return;

    // 마커 초기화
    markersRef.current.forEach((marker) => (marker.map = null));
    markersRef.current = [];

    // 마커 생성
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
          panTo(event.latitude!, event.longitude!);
          setSelectedEvent(event);
        });

        markersRef.current.push(marker);
      }
    });
  }, [events, setSelectedEvent]);

  return (
    <>
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
        {/* 마커는 useEffect에서 동적으로 추가 */}
      </GoogleMap>
    </>
  );
};

export default MapWithMarkers;
