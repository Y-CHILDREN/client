import { getToken } from 'firebase/messaging';
import { messaging } from './settingFCM.ts';

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '/firebase-messaging-sw.js',
      );
      console.log('Service Worker 등록 성공:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker 등록 실패:', error);
    }
  }
};

async function getDeviceToken() {
  // 권한이 허용된 후에 토큰을 가져옴
  const token = await getToken(messaging, {
    vapidKey:
      'BC1ysjAEdh9aj_PZzR5AuYdgfQeTIUeF1xJIGmW9jt63FasuMEsnngfSlPRRMm82YnfbjvDeqQOrvjPSz0_hVPA',
  });
  console.log('토큰: ', token);
}

export async function handleAllowNotification() {
  await Notification.requestPermission();
  registerServiceWorker();
  try {
    await getDeviceToken();
  } catch (error) {
    console.log(error);
  }
}
