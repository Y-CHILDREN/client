import React, { useCallback, useEffect, useRef } from 'react';
import EventCardRow from '@/core/presentation/components/TripDetail/eventCardRow/EventCardRow.tsx';

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

interface Props {
  selectedDate?: Date;
  events: TripEvent[];
  selectedEvent: TripEvent;
  setSelectedEvent: (event: TripEvent) => void;
  onEditEvent: (eventId: number) => void;
  onDeleteEvent: (eventId: number) => void;
}

const EventCardList: React.FC<Props> = ({
  selectedDate,
  events,
  selectedEvent,
  setSelectedEvent,
  onEditEvent,
  onDeleteEvent,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]); // 카드 요소 배열
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // 스크롤 지연을 줘서 상태 업데이트 빈도수를 줄인다.

  // 중앙에 가까운 카드 포커싱
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    let closestCard = null;
    let closestDistance = Infinity;

    // 모든 카드 요소를 순회하며 중앙에 가장 가까운 카드 식별
    Array.from(container.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = events[index]; // 해당 이벤트 저장
      }
    });

    // 중앙에 위치한 카드로 상태 업데이트
    if (closestCard) {
      setSelectedEvent(closestCard);
    }
  }, [events, setSelectedEvent]);

  // 스크롤 debounce
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const debouncedScroll = () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(handleScroll, 10);
    };

    container.addEventListener('scroll', debouncedScroll);
    return () => {
      container.removeEventListener('scroll', debouncedScroll);
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [handleScroll]);

  // 날짜 탭 이동 포커싱
  useEffect(() => {
    // 초기 로드 시 첫 번째 이벤트를 선택
    if (events.length > 0) {
      // 첫 번째 이벤트로 상태 업데이트
      setSelectedEvent(events[0]);
    }
  }, [selectedDate]);

  // 이벤트 카드와 마커 동기화
  useEffect(() => {
    if (!containerRef.current || !selectedEvent) return;

    // 선택된 이벤트의 카드 DOM 요소 가져오기
    const selectedIndex = events.findIndex(
      (event) => event.trip_event_id === selectedEvent.trip_event_id,
    );
    const selectedCard = cardRefs.current[selectedIndex];

    if (selectedCard) {
      const container = containerRef.current;

      // 중앙으로 스크롤
      container.scrollTo({
        left:
          selectedCard.offsetLeft -
          container.offsetWidth / 2 +
          selectedCard.offsetWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [selectedEvent, events]);

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-auto snap-x snap-mandatory py-4 px-2 hide-scrollbar min-w-[270px]"
    >
      {events.map((event, index) => (
        <div
          key={event.trip_event_id}
          ref={(el) => (cardRefs.current[index] = el)}
        >
          <EventCardRow
            index={index + 1}
            title={event.title}
            destination={event.destination}
            startDate={event.start_date}
            endDate={event.end_date}
            image={event.place_image}
            cost={event.cost.reduce((sum, item) => sum + item.cost, 0)}
            isSelected={selectedEvent?.trip_event_id === event.trip_event_id}
            onClick={() => setSelectedEvent(event)}
            onEdit={() => onEditEvent(event.trip_event_id)}
            onDelete={() => onDeleteEvent(event.trip_event_id)}
          />
        </div>
      ))}
    </div>
  );
};

export default EventCardList;
