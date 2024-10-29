interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="w-[375px] h-[812px] bg-black flex flex-col justify-btween bg-[url('src/core/presentation/assets/loginpage/loginbackground.gif')] bg-cover filter brightness-75">
        <div className="w-[375px] h-[29px] p-[21px] bg-white"></div>
        <main className="flex flex-col items-start justify-btween p-[20px_24px_48px] flex-1 self-stretch">
          {children}
        </main>
        <div className="w-[375px] h-[21px] bg-white"></div>;
      </div>
    </>
  );
};

export default LoginLayout;
