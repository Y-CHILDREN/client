import { Outlet } from 'react-router-dom';

const LoginLayout: React.FC = () => {
  const loginBackgroundImg = '/assets/loginPage/bg_loginPage.webp';

  return (
    <>
      <div
        className="w-[420px] h-[812px] bg-black flex flex-col justify-btween bg-cover filter brightness-85"
        style={{ backgroundImage: `url(${loginBackgroundImg})` }}
      >
        <main className="flex flex-col items-center justify-btween p-[20px_24px_48px] flex-1 self-stretch">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default LoginLayout;
