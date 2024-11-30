import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { useAuthStore } from '../hooks/stores/authStore';
import { useToast } from '../hooks/useToast';
import { deleteUser } from '../../data/infrastructure/services/userService';

const DeleteCompletePage = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const [confirmEmail, setConfirmEmail] = useState('');
  const { showToast } = useToast();

  const backgroundImg = '/assets/deleteCompletePage/bg_delPage.gif';

  const handleConfirm = async () => {
    if (confirmEmail === user?.email) {
      try {
        if (!user?.id) {
          throw new Error('사용자 ID가 없습니다');
        }
        await deleteUser(user.id);
        await clearAuth();
        showToast('탈퇴가 정상 처리 되었습니다.', 'success');
        navigate('/login', { replace: true });
      } catch (error) {
        console.error('회원 삭제 실패:', error);
      }
    } else {
      showToast('이메일이 일치하지 않습니다.', 'error');
    }
  };

  const handleCancel = () => {
    navigate('/mypage', { replace: true });
  };

  return (
    <>
      <Header>회원 탈퇴</Header>
      <div className="flex flex-col items-center justify-center p-6 ">
        <div className="h-[380px] flex items-center justify-center ">
          <img src={backgroundImg} alt="byebye" className="w-[80%]" />
        </div>
        <div className="flex flex-col items-start gap-6 text-center">
          <p className="px-4 text-[14px] font-bold">
            탈퇴를 원하시면 아래 창에 이메일을 입력해주세요.
          </p>
          <input
            type="text"
            placeholder="이메일을 입력해주세요"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            className="w-full h-[48px] flex items-center p-4 border border-[#AAADB0] rounded"
          />
        </div>
        <div className="flex items-start self-stretch justify-center gap-3">
          <button
            onClick={handleCancel}
            className="mt-8 w-full max-w-[320px] h-[48px] bg-[#AAADB0] text-white rounded-lg hover:cursor-pointer "
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="mt-8 w-full max-w-[320px] h-[48px] bg-[#45E1B2] text-white rounded-lg hover:cursor-pointer"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteCompletePage;
