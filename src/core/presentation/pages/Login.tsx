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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '200px',
                justifyContent: 'center',
              }}
            >
              {!showFinal &&
                textList.map((text, index) => (
                  <h2
                    style={{ margin: 0, padding: 0 }}
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
          <div style={{ marginTop: '300px' }}>
            <button
              style={{
                backgroundColor: 'white',
                color: 'black',
                marginRight: 10,
              }}
              onClick={handleGoogleLogin}
            >
              Google 로그인
            </button>
            <button
              style={{
                backgroundColor: 'yellow',
                color: 'black',
                marginRight: 10,
              }}
              onClick={handleKakaoLogin}
            >
              Kakao 로그인
            </button>
            <button
              style={{
                backgroundColor: 'green',
                color: 'white',
              }}
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
              style={{ width: 100, height: 100, borderRadius: '50%' }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
