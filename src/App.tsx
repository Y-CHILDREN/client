import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import ZustandPractice from './core/presentation/pages/ZustandPractice';
import Layout from './core/presentation/components/layout/Layout';
import Login from './core/presentation/pages/Login';
import Home from './core/presentation/pages/Home';
import CreateTrip from './core/presentation/pages/CreateTrip';
import LoginLayout from './core/presentation/components/layout/LoginLayout';
import Mypage from './core/presentation/pages/Mypage';

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
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/zustand"
            element={
              <Layout>
                <ZustandPractice />
              </Layout>
            }
          />
          <Route
            path="/create-trip"
            element={
              <Layout>
                <CreateTrip />
              </Layout>
            }
          />
          <Route
            path="/mypage"
            element={
              <Layout>
                <Mypage />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
