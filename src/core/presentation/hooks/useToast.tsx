import { useContext } from 'react';
import { ToastMessage } from '../components/ui/ToastMessageProvider';

export const useToast = () => {
  const context = useContext(ToastMessage);
  if (!context) {
    throw new Error('오류가 발생했습니다.');
  }
  return context;
};
