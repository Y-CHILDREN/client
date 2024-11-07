import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="flex h-[64px] items-center flex-shrink-0 self-stretch bg-white border-t border-gray-200 ">
      <div className="flex h-[64px] px-0 py-2 flex-col justify-center items-center gap-1 flex-[1_0_0]">
        <img
          src="src/core/presentation/assets/navigation/House.svg"
          alt="home"
          className="w-[20px] h-[20px] flex-shrink-0"
        />
        <div className="color-#AAADB0 text-center font-Pretendard text-[10px] font-normal leading-3">
          홈
        </div>
      </div>
      <div className="flex h-[64px] px-0 py-2 flex-col justify-center items-center gap-1 flex-[1_0_0]">
        <img
          src="src/core/presentation/assets/navigation/SuitcaseRolling.svg"
          alt="내여행"
          className="w-[20px] h-[20px] flex-shrink-0"
        />
        <div className="color-#AAADB0 text-center font-Pretendard text-[10px] font-normal leading-3">
          내여행
        </div>
      </div>
      <div className="flex h-[64px] px-0 py-2 flex-col justify-center items-center gap-1 flex-[1_0_0]">
        <img
          src="src/core/presentation/assets/navigation/User.svg"
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
