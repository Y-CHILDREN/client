const TripCard = () => {
  return (
    <div className="flex items-center self-stretch gap-5 p-4 rounded-xl bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.04),0px_0px_4px_0px_rgba(0,0,0,0.04)]">
      <div className="w-[72px] h-[72px]">
        <img
          src="/src/core/presentation/assets/mytrips/tripCardImage.png"
          alt="여행 이미지"
          className="w-full h-full rounded-[8px] object-cover"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-[6px] flex-1 ">
        <div className="flex items-center self-stretch gap-2">
          <span className="line-clamp-1"> 제주도 가족여행</span>
          <span className="line-clamp-1 text-[#3ACC97]">D-3</span>
        </div>
        <div>
          <div className="flex-1 line-clamp-1 text=[#737678]">
            2024.10.16 ~ 2024.10.20
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
