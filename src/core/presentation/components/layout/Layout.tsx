import React from 'react';
import './Layout.css';
import { useLocation, useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  const { eventId } = useParams();
  return (
    <div className="wrapper">
      {/*Main content*/}
      <main
        className={`flex-grow overflow-x-hidden overflow-y-auto ${
          location.pathname === '/home' ? 'bg-white' : 'bg-[#F5F6F6]'
        }`}
      >
        <Outlet />
      </main>
      {/*Bottom navigation bar*/}
      {location.pathname !== '/add-event' &&
        location.pathname !== `/update-event/${eventId}` && <Footer />}
    </div>
  );
};

export default Layout;
