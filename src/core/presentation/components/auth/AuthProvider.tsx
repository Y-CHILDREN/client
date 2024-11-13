import { useAuthStore } from '../../hooks/stores/authStore';
import { useUserTripStore } from '../../hooks/stores/userTripStore';
import { getUserById } from '../../../data/infrastructure/services/userService';
import { useEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, setLoading, setAuthenticated } = useAuthStore();
  const { setTripData } = useUserTripStore();

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

        try {
          const response = await fetch(
            `http://localhost:3000/trips/user/${storedUserId}`,
          );
          if (!response.ok) {
            throw new Error('여행 데이터를 불러오는데 실패했습니다.');
          }
          const tripData = await response.json();
          if (Array.isArray(tripData)) {
            setTripData(tripData);
          } else {
            console.error('Trip data is not an array:', tripData);
          }
        } catch (error) {
          console.error('Trip data fetch error:', error);
        }
      } catch (error) {
        console.error('여행 데이터를 불러오는데 실패했습니다.', error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setTripData]);

  return <>{children}</>;
};
