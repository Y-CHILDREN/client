import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div>
          {/* 배경 오버레이 */}
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 바텀시트 */}
          <motion.div
            className="fixed bottom-0 z-50 p-4 bg-white w-[420px] rounded-t-xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween' }}
            onClick={(e) => e.stopPropagation()} // 이벤트 전파 막기
          >
            {children}
            <button
              onClick={onClose}
              className="w-full px-3 mt-3 text-white rounded-lg bg-dot-color"
              type="button"
            >
              확인
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
