import { Outlet } from 'react-router-dom';

const LoginLayout: React.FC = () => {
  return (
    <>
      <div className="w-[420px] h-[812px] bg-black flex flex-col justify-btween bg-[url('src/core/presentation/assets/loginpage/loginbackground.gif')] bg-cover filter brightness-75">
        <main className="flex flex-col items-start justify-btween p-[20px_24px_48px] flex-1 self-stretch">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default LoginLayout;