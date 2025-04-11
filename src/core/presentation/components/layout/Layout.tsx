import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  const { eventId } = useParams();
  return (
    <div
      className=" h-screen
    w-[420px]
    mx-auto
    bg-white
    text-black
    flex
    flex-col
    relative
    shadow-[inset_-10px_0_15px_-10px_rgba(0,0,0,0.2),_inset_10px_0_15px_-10px_rgba(0,0,0,0.2)]
    overflow-y-hidden
    [&::-webkit-scrollbar]:hidden
    scrollbar-thin
    scrollbar-none"
    >
      {/*Main content*/}
      <main
        className={`flex-grow overflow-x-hidden overflow-y-auto ${
          location.pathname === '/home' || location.pathname === '/delete-user'
            ? 'bg-white'
            : 'bg-[#F5F6F6]'
        }`}
      >
        <Outlet />
      </main>
      {/*Bottom navigation bar*/}
      {location.pathname !== '/add-event' &&
        location.pathname !== `/update-event/${eventId}` &&
        location.pathname !== '/trip-detail' &&
        location.pathname !== '/create-trip' && <Footer />}
    </div>
  );
};

export default Layout;
