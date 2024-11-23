// 외부 API 호출을 관리하거나, 여러 데이터 소스로부터 데이터를 통합하는 서비스 로직이 포함됩니다.
import axios from 'axios';
import User from '../../../domain/entities/user';

const apiUrl = import.meta.env.VITE_API_URL;
console.log(`API URL: ${apiUrl}`);

const userApi = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getUserById(id: string): Promise<User | undefined> {
  try {
    const res = await userApi.get(`/users/${id}`);
    if (!res.data) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }
    return res.data;
  } catch (error) {
    console.error('유저 정보를 가져올 수 없습니다.', error);
    throw error;
  }
}

export async function getUserByEmail(email: string): Promise<User> {
  try {
    const res = await userApi.get(`/users/email/${email}`);
    if (!res.data) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }
    return res.data;
  } catch (error) {
    console.error('유저 정보를 가져올 수 없습니다.', error);
    throw error;
  }
}

export async function updateUserNickName(
  id: string,
  nickname: string,
): Promise<User | undefined> {
  try {
    const res = await userApi.patch(`/mypage/users/${id}/${nickname}`);
    return res.data;
  } catch (error) {
    console.log('업데이트에 실패 했습니다.', error);
  }
}

export async function updateUserImage(
  id: string,
  user_image: string,
): Promise<User | undefined> {
  try {
    const formData = new FormData();
    formData.append('user_image', user_image);

    const res = await userApi.patch(`/users/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.log('업데이트에 실패 했습니다.', error);
  }
}

export async function deleteUser(id: string): Promise<User | undefined> {
  try {
    const res = await userApi.delete(`/users/${id}`);

    // 회원 탈퇴 후 캐시 초기화
    userApi.defaults.headers.common = {};
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      localStorage.clear();
    }

    console.log('삭제 데이터:', res.data);
    return res.data;
  } catch (error) {
    console.log('삭제에 실패 했습니다.', error);
    throw error; // 에러를 throw하도록 수정
  }
}

export async function logout(): Promise<void> {
  try {
    const response = await userApi.post('/users/logout');

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    userApi.defaults.headers.common = {};

    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      localStorage.clear();
    }
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
}
