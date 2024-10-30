import React from 'react';

import Header from './Header';
// import Footer from './Footer';
import './Layout.css';
import Navigation from './Navigation';
import Footers from './Footers';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container">
      {/*Header*/}
      <Header />

      {/*Main content*/}
      <main className="flex-grow">{children}</main>

      <Navigation />
      {/*Bottom navigation bar*/}
      <Footers />
    </div>
  );
};

export default Layout;
