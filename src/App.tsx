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

const App: React.FC = () => {
  return (
    <>
      <LoginLayout>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </LoginLayout>
      <Layout>
        <Router>
          <Routes>
            <Route path="/zustand" element={<ZustandPractice />} />
            <Route path="/" element={<Home />} />
            <Route path="/create-trip" element={<CreateTripPage />} />
            <Route path="/mypage" element={<Mypage />} />
          </Routes>
        </Router>
      </Layout>
    </>
  );
};

export default App;
