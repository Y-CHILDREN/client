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
      <div>
        <p className="text-[#17B47B] font-pretendard text-[20px] font-semibold leading-[28px]">
          여행자 {userName}님,
        </p>
        {hasOngoingTrip ? (
          <p className="font-pretendard text-[20px] font-semibold leading-[28px]">
            즐거운 여행 중이세요?
          </p>
        ) : (
          <p className="font-pretendard text-[20px] font-semibold leading-[28px]">
            여행을 계획 중이신가요?
          </p>
        )}
      </div>
    </div>
  );
};

export default IntroMessage;
