import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../core/presentation/hooks/stores/authStore';
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
