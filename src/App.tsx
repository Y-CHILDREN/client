import React from 'react';
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
import DeleteCompletePage from './core/presentation/pages/DeleteCompletePage';
import { TripDetailPage } from './core/presentation/pages/TripDetailPage';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <AuthProvider>
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
              <Route path="/home" element={<Home />} />
              <Route path="/create-trip" element={<CreateTripPage />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/mytrips" element={<Mytrips />} />
              <Route path="/deletecomplete" element={<DeleteCompletePage />} />
              <Route path="/trip-detail" element={<TripDetailPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
