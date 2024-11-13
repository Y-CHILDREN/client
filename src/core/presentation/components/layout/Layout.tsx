import React from 'react';
import './Layout.css';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  return (
    <div className="container">
      {/*Main content*/}
      <main className="flex-grow">
        <Outlet />
      </main>
      {/*Bottom navigation bar*/}
      {location.pathname !== '/add-event' && <Footer />}
    </div>
  );
};

export default Layout;
