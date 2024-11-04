import React from 'react';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div className="flex h-[48px] justify-center items-center flex-[1_0_0] rounded-[8px]">
      <div className="text-center font-pretendard font-semibold text-[18px] leading-6 text-black">
        {children}
      </div>
    </div>
  );
};

export default Header;
