import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import ZustandPractice from './core/presentation/pages/ZustandPractice';
import Layout from './core/presentation/components/layout/Layout';
import Home from './core/presentation/pages/Home';
import { CreateTripPage } from './core/presentation/pages/CreateTripPage';
import AddEventPage from './core/presentation/pages/AddEventPage.tsx';

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route path="/zustand" element={<ZustandPractice />} />
            <Route path="/" element={<Home />} />
            <Route path="/create-trip" element={<CreateTripPage />} />
            <Route path="/trip/event/add" element={<AddEventPage />} />
          </Routes>
        </Router>
      </Layout>
    </>
  );
};

export default App;
