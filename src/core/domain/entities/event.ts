export interface Cost {
  category: string;
  value: number;
}
export interface Event {
  trip_id: number;
  event_id: number;
  event_name: string;
  location: string;
  start_date: string;
  end_date: string;
  cost: Cost[];
  latitude?: number; // 위도
  longitude?: number; // 경도
  place_image?: string; // google place image
}
