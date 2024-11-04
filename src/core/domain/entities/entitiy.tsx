// 애플리케이션에서 사용되는 기본 데이터 모델을 정의하는 클래스나 타입들이 위치합니다.
export interface User {
  id: string;
  provider: string;
  email: string;
  user_image: string;
  nickname: string;
  user_memo: string;
  access_token: string;
  refresh_token: string;
  trip_history: [];
}
