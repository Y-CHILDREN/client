import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import ZustandPractice from './core/presentation/pages/ZustandPractice';
import Layout from './core/presentation/components/layout/Layout';
import Login from './core/presentation/pages/Login';
import Home from './core/presentation/pages/Home';
import LoginLayout from './core/presentation/components/layout/LoginLayout';
import { CreateTripPage } from './core/presentation/pages/CreateTripPage';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginLayout>
                <Login />
              </LoginLayout>
            }
          />

          <Route element={<Layout children={undefined} />}>
            <Route path="/" element={<Home />} />
            <Route path="/zustand" element={<ZustandPractice />} />
            <Route path="/create-trip" element={<CreateTrip />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
