import { useAuthStore } from '../../hooks/stores/authStore';
import { useUserTripStore } from '../../hooks/stores/userTripStore';
import { getUserById } from '../../../data/infrastructure/services/userService';
import { useEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, setLoading, setAuthenticated } = useAuthStore();
  const { setUserTripData } = useUserTripStore();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const storedUserId = sessionStorage.getItem('userId');
      const storedToken = sessionStorage.getItem('token');

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
          const response = await fetch(`${apiUrl}/trips/user/${storedUserId}`);
          if (!response.ok) {
            throw new Error('여행 데이터를 불러오는데 실패했습니다.');
          }
          const tripData = await response.json();
          if (Array.isArray(tripData)) {
            setUserTripData(tripData);
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
  }, [apiUrl, setAuthenticated, setLoading, setUserTripData, setUser]);

  return <>{children}</>;
};
