// libraries 중복 전달 오류 방지를 위해서 사용.
export const GOOGLE_MAP_LIBRARIES: (
  | 'places'
  | 'geometry'
  | 'drawing'
  | 'marker'
)[] = ['marker', 'places'];
