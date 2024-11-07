import Header from '../components/layout/Header';
import TripCard from '../components/TripCard';
import { useState } from 'react';

type TabType = '예정된 여행' | '여행중' | '완료된 여행';

function Mytrips() {
  const [activeTab, setActiveTab] = useState<TabType>('예정된 여행');

  return (
    <>
      <Header>내 여행</Header>
      <div className="flex w-[375px] p-[0px_20px] items-start">
        {['예정된 여행', '여행중', '완료된 여행'].map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab as TabType)}
            className={`flex h-[48px] justify-center items-center gap-1 flex-1  px-4 py-2 ${
              activeTab === tab
                ? 'text-[#151616] border-b-[2px] border-[#222324]'
                : 'text-[#AAADB0]'
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start self-stretch flex-1 gap-3 p-5">
        <TripCard />
      </div>
    </>
  );
}

export default Mytrips;
