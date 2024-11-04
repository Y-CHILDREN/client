import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';

export interface User {
  id: string;
  provider: string;
  email: string;
  user_image: string;
  nickname: string;
  user_memo: string;
  access_token: string;
  refresh_token: string;
  trip_history: [];
}

const Login: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [textList, setTextList] = useState<string[]>([]);
  const [showFinal, setShowFinal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const env = import.meta.env.VITE_ENV;
  const isProduction = env === 'production';

  const callbackUrls = {
    google: isProduction
      ? import.meta.env.VITE_AWS_EC2_GOOGLE_CALLBACK_URL
      : import.meta.env.VITE_LOCAL_GOOGLE_CALLBACK_URL,
    kakao: isProduction
      ? import.meta.env.VITE_AWS_EC2_KAKAO_CALLBACK_URL
      : import.meta.env.VITE_LOCAL_KAKAO_CALLBACK_URL,
    naver: isProduction
      ? import.meta.env.VITE_AWS_EC2_NAVER_CALLBACK_URL
      : import.meta.env.VITE_LOCAL_NAVER_CALLBACK_URL,
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    const userParam = urlParams.get('user');
    const errorParam = urlParams.get('error');

    if (tokenParam && userParam) {
      setToken(tokenParam);
      setUser(JSON.parse(decodeURIComponent(userParam)));
      navigate('/mypage');
    } else if (errorParam === 'email_conflict') {
      setError('이미 가입된 이메일이 있습니다.');
    } else if (errorParam === 'login_failed') {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
      navigate('/login');
    }
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = callbackUrls.google;
  };

  const handleKakaoLogin = () => {
    window.location.href = callbackUrls.kakao;
  };

  const handleNaverLogin = () => {
    window.location.href = callbackUrls.naver;
  };

  useEffect(() => {
    const phrases = ['누구나', '', 'J처럼', '여행하기'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      setTextList((prev) => [...prev, phrases[currentIndex]]);
      currentIndex++;

      if (currentIndex === phrases.length) {
        clearInterval(interval);
        setTimeout(() => {
          setTextList([]);
          setShowFinal(true);
        }, 1000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {!user ? (
        <>
          <div className="w-[327px] h-[573px] p-[24px_20px_24px] flex flex-col justify-center items-center g-[4px] flex-1 self-stretch filter brightness-200">
            <div className="flex flex-col w-[112px] h-[120px] items-center text-center text-[32px] font-bold leading-[40px] font-pretendard">
              {!showFinal &&
                textList.map((text, index) => (
                  <h2 key={index} className="text-white fade-in text-2x1">
                    {text}
                  </h2>
                ))}
              {showFinal && (
                <h1 className="flex flex-col items-center justify-center w-full h-screen text-4xl font-bold text-green-500 fade-in">
                  J트립
                </h1>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-[24px] self-stretch">
            <div className="flex justify-center items-center gap-[16px] self-stretch">
              <div className="h-[1px] flex-[1_0_0] bg-[rgba(255,255,255,0.4)]"></div>
              <div className="font-pretendard text-[14px] font-semibold leading-[20px] text-white">
                간편 로그인으로 여행 시작하기
              </div>
              <div className="h-[1px] flex-[1_0_0] bg-[rgba(255,255,255,0.4)]"></div>
            </div>
            <div className="flex items-center gap-[20px]">
              <button
                className="flex w-[56px] h-[56px] justify-center items-center gap-[16px] rounded-[160px] bg-white p-0
            "
                onClick={handleGoogleLogin}
              >
                <img
                  className="w-[24px] h-[25px]"
                  src="src/core/presentation/assets/loginPage/Google Logo.svg"
                  alt="구글 로고"
                />
              </button>
              <button
                className="flex w-[56px] h-[56px] justify-center items-center gap-[16px] rounded-[160px] bg-[#FEE500] p-0 
            "
                onClick={handleKakaoLogin}
              >
                <img
                  className="w-[24px] h-[25px]"
                  src="src/core/presentation/assets/loginPage/logo-kakao.svg"
                  alt="카카오 로고"
                />
              </button>
              <button
                className="flex w-[56px] h-[56px] justify-center items-center gap-[16px] rounded-[160px] bg-[#03C75A] p-0
            "
                onClick={handleNaverLogin}
              >
                <img
                  className="w-[24px] h-[25px]"
                  src="src/core/presentation/assets/loginPage/logo-naver.svg"
                  alt="네이버 로고"
                />
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        </>
      ) : (
        <div>로그인 실패!</div>
      )}
    </div>
  );
};

export default Login;
