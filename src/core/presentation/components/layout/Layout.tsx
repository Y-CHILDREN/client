import React from 'react';
import './Layout.css';

import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="container relative">
      {/*Main content*/}
      <main className="flex-grow">
        <Outlet />
      </main>
      {/*Bottom navigation bar*/}
      <Footer />
    </div>
  );
};

export default Layout;
