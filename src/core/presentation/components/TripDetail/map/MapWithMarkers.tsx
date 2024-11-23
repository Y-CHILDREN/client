import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';

import { Event } from '@/core/domain/entities/event.ts';

interface MapWithMarkersProps {
  events: Event[];
  mapCenter?: google.maps.LatLngLiteral;
  mapContainerStyle: { width: string; height: string };
  selectedEvent?: Event | null;
  setSelectedEvent: (event: Event) => void;
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
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false); // 로드 완료 여부 상태 추가

  const onLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMapInstance(map); // 상태로 지도 참조 저장
    setIsMapLoaded(true); // 로드 완료 상태 업데이트
  }, []);

  const onUnmount = React.useCallback(() => {
    mapRef.current = null;
    setIsMapLoaded(false); // 언마운트 시 로드 상태 초기화
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
  }, [selectedEvent, panTo]);

  // 마커
  useEffect(() => {
    if (!mapInstance || !isMapLoaded) return; // 지도 로드가 완료되지 않았으면 마커를 추가하지 않음

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
          map: mapInstance,
          position: { lat: event.latitude, lng: event.longitude },
          content: markerElement,
          title: event.event_name,
        });

        marker.addListener('gmp-click', () => {
          panTo(event.latitude!, event.longitude!);
          setSelectedEvent(event);
        });

        markersRef.current.push(marker);
      }
    });
  }, [events, setSelectedEvent, mapInstance, isMapLoaded]);

  // logging
  useEffect(() => {
    // console.log('isMapLoaded:', isMapLoaded);
    // console.log('mapRef:', mapRef);
    // console.log('mapInstance:', mapInstance);
    // console.log('selectedEvent:', selectedEvent);
  }, [isMapLoaded, mapInstance, mapRef, selectedEvent]);

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
