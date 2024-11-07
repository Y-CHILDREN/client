import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import ZustandPractice from './core/presentation/pages/ZustandPractice';
import Layout from './core/presentation/components/layout/Layout';
import Login from './core/presentation/pages/Login';
import Home from './core/presentation/pages/Home';
import LoginLayout from './core/presentation/components/layout/LoginLayout';
import Mypage from './core/presentation/pages/Mypage';
import { CreateTripPage } from './core/presentation/pages/CreateTripPage';
import AddEventPage from './core/presentation/pages/AddEventPage.tsx';
import Mytrips from './core/presentation/pages/Mytrips';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/zustand" element={<ZustandPractice />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create-trip" element={<CreateTripPage />} />
            <Route path="/trip/event/add" element={<AddEventPage />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mytrips" element={<Mytrips />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
