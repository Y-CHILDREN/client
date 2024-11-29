import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getIconSrc = (path: string) => {
    const currentPath = location.pathname;
    const isMyTripsSection =
      currentPath === '/mytrips' || currentPath === '/trip-detail';

    if (path === '/mytrips' && isMyTripsSection) {
      return '/assets/navigation/onSuitcaseRolling.svg';
    }

    if (currentPath === path) {
      if (path === '/home') return '/assets/navigation/onHouse.svg';
      if (path === '/mypage') return '/assets/navigation/onUser.svg';
    }

    if (path === '/home') return '/assets/navigation/offHouse.svg';
    if (path === '/mytrips') return '/assets/navigation/offSuitcaseRolling.svg';
    return '/assets/navigation/offUser.svg';
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex h-[64px] items-center flex-shrink-0 self-stretch bg-white border-t border-gray-200 ">
      <div
        className="flex h-[64px] px-0 py-2 flex-col justify-center items-center gap-1 flex-[1_0_0] hover:cursor-pointer"
        onClick={() => handleNavigation('/home')}
      >
        <img
          src={getIconSrc('/home')}
          alt="home"
          className="w-[20px] h-[20px] flex-shrink-0"
        />
        <div className="color-#AAADB0 text-center font-Pretendard text-[10px] font-normal leading-3">
          홈
        </div>
      </div>
      <div
        className="flex h-[64px] px-0 py-2 flex-col justify-center items-center gap-1 flex-[1_0_0] hover:cursor-pointer"
        onClick={() => handleNavigation('/mytrips')}
      >
        <img
          src={getIconSrc('/mytrips')}
          alt="내여행"
          className="w-[20px] h-[20px] flex-shrink-0"
        />
        <div className="color-#AAADB0 text-center font-Pretendard text-[10px] font-normal leading-3">
          내여행
        </div>
      </div>
      <div
        className="flex h-[64px] px-0 py-2 flex-col justify-center items-center gap-1 flex-[1_0_0] hover:cursor-pointer"
        onClick={() => handleNavigation('/mypage')}
      >
        <img
          src={getIconSrc('/mypage')}
          alt="마이페이지"
          className="w-[20px] h-[20px] flex-shrink-0"
        />
        <p className="color-#AAADB0 text-center font-Pretendard text-[10px] font-normal leading-3">
          마이페이지
        </p>
      </div>
    </div>
  );
};
export default Footer;
