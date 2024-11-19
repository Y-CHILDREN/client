import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { useAuthStore } from '../hooks/stores/authStore';

const DeleteCompletePage = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  const backgroundImg = '/assets/deleteCompletePage/bg_delPage.gif';

  const handleConfirm = () => {
    clearAuth();
    navigate('/login', { replace: true });
  };

  return (
    <>
      <Header>회원 탈퇴</Header>
      <div className="flex flex-col items-center justify-center p-6 ">
        <div className="h-[500px] flex items-center justify-center ">
          <img src={backgroundImg} alt="byebye" />
        </div>
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-xl font-bold">회원 탈퇴가 완료되었습니다</h2>
          <p>ByeBye🖐️</p>
        </div>
        <button
          onClick={handleConfirm}
          className="mt-8 w-full max-w-[320px] h-[48px] bg-[#45E1B2] text-white rounded-lg"
        >
          확인
        </button>
      </div>
    </>
  );
};

export default DeleteCompletePage;
