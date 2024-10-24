import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-gray-700 text-white p-3 flex justify-around">
      <a href="#" className="flex flex-col items-center">
        <span className="text-sm">Home</span>
      </a>
      <a href="#" className="flex flex-col items-center">
        <span className="text-sm">Search</span>
      </a>
      <a href="#" className="flex flex-col items-center">
        <span className="text-sm">About</span>
      </a>
    </footer>
  );
};

export default Footer;
