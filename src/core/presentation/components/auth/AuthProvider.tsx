import { useAuthStore } from '../../hooks/stores/authStore';
import { getUserById } from '../../../data/infrastructure/services/userRepositoryImpl';
import { useEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, setLoading, setAuthenticated } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const storedUserId = localStorage.getItem('userId');
      const storedToken = localStorage.getItem('token');

      if (!storedUserId || !storedToken) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const updatedUser = await getUserById(storedUserId);
        if (updatedUser) {
          setUser(updatedUser);
          setAuthenticated(true);
        }
      } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return <>{children}</>;
};
