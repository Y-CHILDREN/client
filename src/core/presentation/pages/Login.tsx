import { useEffect, useState } from 'react';
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

const Login = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [textList, setTextList] = useState<string[]>([]);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    const userParam = urlParams.get('user');

    if (tokenParam && userParam) {
      setToken(tokenParam);
      setUser(JSON.parse(decodeURIComponent(userParam)));
    }
  }, []);

  const handleGoogleLogin = () => {
    window.location.href =
      'http://ec2-13-124-226-192.ap-northeast-2.compute.amazonaws.com:3000/auth/google/callback';
  };

  const handleKakaoLogin = () => {
    window.location.href =
      'http://ec2-13-124-226-192.ap-northeast-2.compute.amazonaws.com:3000/auth/kakao/callback';
  };
  const handleNaverLogin = () => {
    window.location.href =
      'http://ec2-13-124-226-192.ap-northeast-2.compute.amazonaws.com:3000/auth/naver/callback';
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
          <div>
            <div className="flex flex-col min-h-[200px] justify-center">
              {!showFinal &&
                textList.map((text, index) => (
                  <h2
                    // className="m-0, p-0"
                    key={index}
                    className="fade-in"
                  >
                    {text}
                  </h2>
                ))}
              {showFinal && (
                <h1 style={{ color: 'green' }} className="fade-in">
                  J트립
                </h1>
              )}
            </div>
          </div>
          <div className="my-300">
            <button
              className="bg-white text-black mr-10"
              onClick={handleGoogleLogin}
            >
              Google 로그인
            </button>
            <button
              className="bg-yellow-300 text-black mr-10"
              onClick={handleKakaoLogin}
            >
              Kakao 로그인
            </button>
            <button
              className="bg-green-600 text-white"
              onClick={handleNaverLogin}
            >
              Naver 로그인
            </button>
          </div>
        </>
      ) : (
        <div>
          <h2>로그인 성공</h2>
          <p>토큰: {token}</p>
          <p>유저 정보: {JSON.stringify(user)}</p>
          {user.user_image && (
            <img
              src={user.user_image}
              alt="User profile"
              className="w-100 h-100 br-50%"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
