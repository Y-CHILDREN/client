import React, { createContext, useContext, useState } from 'react';

type Toast = { message: string; type: 'success' | 'error' };

interface ToastContextType {
  showToast: (message: string, type: 'success' | 'error') => void;
}

const ToastMessage = createContext<ToastContextType | undefined>(undefined);

const ToastMessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastMessage.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg ${
            toast.type === 'success'
              ? 'bg-[#45E1B2] text-white text-[14px]'
              : 'bg-red-500 text-white text-[14px]'
          }`}
        >
          {toast.message}
        </div>
      )}
    </ToastMessage.Provider>
  );
};

export default ToastMessageProvider;

export const useToast = () => {
  const context = useContext(ToastMessage);
  if (!context) {
    throw new Error('오류가 발생했습니다.');
  }
  return context;
};
