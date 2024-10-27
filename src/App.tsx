import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import ZustandPractice from './core/presentation/pages/ZustandPractice';
import Layout from './core/presentation/components/layout/Layout';
import Login from './core/presentation/pages/Login';
import Home from './core/presentation/pages/Home';
import CreateTrip from './core/presentation/pages/CreateTrip';

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/zustand" element={<ZustandPractice />} />
            <Route path="/" element={<Home />} />
            <Route path="/create-trip" element={<CreateTrip />} />
          </Routes>
        </Router>
      </Layout>
    </>
  );
};

export default App;
