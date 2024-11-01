import React from 'react';

import Header from './Header';
// import Footer from './Footer';
import './Layout.css';
import Navigation from './Navigation';
import Footers from './Footers';
import { Outlet } from 'react-router-dom';


const Layout: React.FC = () => {
  return (
    <div className="container">
      {/*Header*/}
      <Header />

      {/*Main content*/}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Navigation />
      {/*Bottom navigation bar*/}
      <Footers />
    </div>
  );
};

export default Layout;
