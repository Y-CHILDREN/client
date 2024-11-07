import User from '../entities/user';

export interface UserRepository {
  getUserById: (id: string) => Promise<User>;
  getUserByEmail: (email: string) => Promise<User>;
  updateUserNickname: (id: string, nickname: string) => Promise<User>;
  updateUserMemo: (id: string, memo: string) => Promise<User>;
  updateUserImage: (id: string, imageFile: File) => Promise<User>;
  logout: () => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}
