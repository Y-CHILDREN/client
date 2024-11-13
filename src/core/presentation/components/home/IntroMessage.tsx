// IntroMessage.tsx

import React from 'react';

interface IntroMessageProps {
  userName: string;
  hasOngoingTrip: boolean;
}

const IntroMessage: React.FC<IntroMessageProps> = ({
  userName,
  hasOngoingTrip,
}) => {
  return (
    <div className="flex flex-col items-start gap-2 self-stretch p-6 pb-4">
      <span className="text-left text-[#17B47B] font-pretendard text-[20px] font-semibold leading-[28px]">
        여행자 {userName}님,
      </span>
      {hasOngoingTrip ? (
        <span className="text-left font-pretendard text-[20px] font-semibold leading-[28px]">
          즐거운 여행 중이세요?
        </span>
      ) : (
        <span className="text-left font-pretendard text-[20px] font-semibold leading-[28px]">
          여행을 계획 중이신가요?
        </span>
      )}
    </div>
  );
};

export default IntroMessage;
