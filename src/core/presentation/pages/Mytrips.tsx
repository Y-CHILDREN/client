import Header from '../components/layout/Header';
import TripCard from '../components/TripCard';

function Mytrips() {
  return (
    <>
      <Header>내 여행</Header>
      <div className="flex w-[375px] p-[0px_20px] items-start">
        <div className="flex h-[48px] justify-center items-center gap-1 flex-1 border-b-[2px] border-[#222324]">
          예정된 여행
        </div>
        <div className="flex h-[48px] justify-center items-center gap-1 flex-1 text-[#AAADB0]">
          여행중
        </div>
        <div className="flex h-[48px] justify-center items-center gap-1 flex-1 text-[#AAADB0]">
          완료된 여행
        </div>
      </div>
      <div className="flex flex-col items-start self-stretch flex-1 gap-3 p-5">
        <TripCard />
      </div>
    </>
  );
}

export default Mytrips;
