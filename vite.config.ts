import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
//shadcn 설치 위해 코드 추가
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //shadcn 설치 위해 코드 추가
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
