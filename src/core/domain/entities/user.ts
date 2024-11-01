interface User {
  id: number;
  provider: string;
  email: string;
  user_image: string;
  nickname: string;
  user_memo: string;
  access_token: string;
  refresh_token: string;
  trip_history: Array<number>;
}

export default User;
