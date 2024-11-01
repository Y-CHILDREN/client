import Header from '../components/layout/Header';

const Mypage = () => {
  return (
    <>
      <Header>마이페이지</Header>
      <div className="flex p-[32px_24px_28px_24px] flex-col items-start gap-6 flex-[1_0_0] self-stretch relative">
        <img
          src="src/core/presentation/assets/mypage/Group2.png"
          alt="Group2"
          className="absolute w-[80px] h-[76px] left-[223.932px] top-[6.262px] transform -rotate-[-2.231deg]"
        />
        <img
          src="src/core/presentation/assets/mypage/Group.png"
          alt="Group"
          className="absolute w-[80px] h-[100px] left-[273.932px] top-[63.262px] transform -rotate-[-3.231deg]"
        />
        <div className="flex flex-col items-start gap-6 flex-[1_0_0] self-stretch">
          <div className="border w-[100px] h-[100px] flex-shrink_0 rounded-[16px] border: 1px solid rgba(0, 0, 0, 0.16);">
            <img
              src="src/core/presentation/assets/mypage/user.svg"
              alt="user이미지"
              className="flex w-[100px] h-[100px] p-[25px] justify-center items-center flex-shrink_0"
            />
          </div>
          <div className="flex flex-col items-start self-stretch justify-center gap-2 px-1">
            <div className="flex items-center self-stretch gap-5">
              <p className="text-gray-700">닉네임</p>
              <p>홍길동</p>
            </div>
            <div className="flex items-center self-stretch gap-5">
              <p className="text-gray-700">이메일</p>
              <p>test@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center self-stretch gap-3 p-4 rounded-[8px] bg-[#45E1B2]">
            <div className="flex items-center flex-1 gap-3">
              <div className="w-[40px] h-[40px] ">
                <img
                  src="src/core/presentation/assets/mypage/tripIcon.png"
                  alt="로고"
                  className="bg-white w-[40px] h-[40px] rounded-[4px] p-[4px]"
                />
              </div>
              <div className="text-white text-start font-sans text-[14px] font-normal leading-[20px]">
                <p>제이트립을</p>
                <p>친구에게도 공유해 주세요!</p>
              </div>
            </div>
            <div className="w-[20px] h-[20px] flex-shrink_0">
              <img
                src="src/core/presentation/assets/mypage/share.svg"
                alt=""
                className="flex w-[32px] h-[32px] justify-center items-center gap-[10px]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-start self-stretch justify-center gap-3 ">
          <button className="flex h-[48px] py-3 px-5 justify-center items-center gap-2 flex-[1_0_0] bg-[#F5F6F6] text-[#545759] rounded-2">
            로그아웃
          </button>
          <button className="flex h-[48px] py-3 px-5 justify-center items-center gap-2 flex-[1_0_0] bg-[#F5F6F6] text-[#545759] rounded-2">
            회원탈퇴
          </button>
        </div>
      </div>
    </>
  );
};
export default Mypage;
