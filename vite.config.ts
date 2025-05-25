import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
//shadcn 설치 위해 코드 추가
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      manifest: false,
      includeAssets: [
        'favicon2.svg',
        'icons/apple-touch-icon-57x57.png',
        'icons/apple-touch-icon-60x60.png',
        'icons/apple-touch-icon-72x72.png',
        'icons/apple-touch-icon-76x76.png',
        'icons/apple-touch-icon-114x114.png',
        'icons/apple-touch-icon-120x120.png',
        'icons/apple-touch-icon-144x144.png',
        'icons/apple-touch-icon-152x152.png',
      ],
      workbox: {
        globPatterns: ['**/*.{js,css,html,png}'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
