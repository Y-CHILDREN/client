import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.css';
import ZustandPractice from './core/presentation/pages/ZustandPractice';
import Layout from './core/presentation/components/layout/Layout';
import Login from './core/presentation/pages/Login';
import Home from './core/presentation/pages/Home';
import LoginLayout from './core/presentation/components/layout/LoginLayout';
import Mypage from './core/presentation/pages/Mypage';
import { CreateTripPage } from './core/presentation/pages/CreateTripPage';

import Mytrips from './core/presentation/pages/Mytrips';
import { AuthProvider } from './core/presentation/components/auth/AuthProvider';
import { ProtectedRoute } from './routers/ProtectedRouter';
import DeleteCompletePage from './core/presentation/pages/DeleteUserPage.tsx';
import { TripDetailPage } from './core/presentation/pages/TripDetailPage';
import ToastMessageProvider from './core/presentation/components/ui/ToastMessageProvider.tsx';

import { useGoogleMapsLoader } from '@/core/presentation/hooks/useGoogleMapsLoader.ts';
import EventFormSkeleton from './core/presentation/components/ui/EventFormSkeleton.tsx';

const AddEventPage = lazy(
  () => import('./core/presentation/pages/AddEventPage.tsx'),
);

const UpdateEventPage = lazy(
  () => import('./core/presentation/pages/UpdateEventPage.tsx'),
);

const App: React.FC = () => {
  const { isLoaded, loadError } = useGoogleMapsLoader();

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <>
      <Router>
        <AuthProvider>
          <ToastMessageProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route element={<LoginLayout />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="/zustand" element={<ZustandPractice />} />
                <Route
                  path="/add-event"
                  element={
                    <Suspense fallback={<EventFormSkeleton />}>
                      <AddEventPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/update-event/:eventId"
                  element={
                    <Suspense fallback={<EventFormSkeleton />}>
                      <UpdateEventPage />
                    </Suspense>
                  }
                />
                <Route path="/home" element={<Home />} />
                <Route path="/create-trip" element={<CreateTripPage />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/mytrips" element={<Mytrips />} />
                <Route path="/delete-user" element={<DeleteCompletePage />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
                <Route path="/trip-detail" element={<TripDetailPage />} />
              </Route>
            </Routes>
          </ToastMessageProvider>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
