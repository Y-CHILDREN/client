import React from 'react';

import Header from './Header';
import Footer from './Footer';
import './Layout.css'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className="container">
      {/*Header*/}
      <Header/>

      {/*Main content*/}
      <main className="flex-grow p-4">
        {children}
      </main>

      {/*Bottom navigation bar*/}
      <Footer/>
    </div>
  );
};

export default Layout;