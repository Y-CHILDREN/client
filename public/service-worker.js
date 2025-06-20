const CACHE_NAME = 'v1-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/apple-touch-icon-57x57.png',
  '/icons/apple-touch-icon-60x60.png',
  '/icons/apple-touch-icon-72x72.png',
  '/icons/apple-touch-icon-76x76.png',
  '/icons/apple-touch-icon-114x114.png',
  '/icons/apple-touch-icon-120x120.png',
  '/icons/apple-touch-icon-144x144.png',
  '/icons/apple-touch-icon-152x152.png',
];

// 정적 자산 판별 함수
function isStaticAsset(url) {
  const staticExtensions = [
    '.js',
    '.css',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.svg',
    '.ico',
    '.woff',
    '.woff2',
  ];
  const pathname = new URL(url).pathname;

  // 확장자로 판별
  if (staticExtensions.some((ext) => pathname.endsWith(ext))) {
    return true;
  }

  // 특정 경로로 판별
  if (pathname.startsWith('/icons/') || pathname.startsWith('/assets/')) {
    return true;
  }

  // manifest 파일
  if (pathname.endsWith('.webmanifest')) {
    return true;
  }

  return false;
}

// 설치 이벤트
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

// activate - 기존 캐시 정리
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        }),
      ),
    ),
  );
});

// fetch 이벤트 - 전략적 캐싱
self.addEventListener('fetch', function (event) {
  const request = event.request;
  const url = new URL(request.url);

  // ✅ API 요청은 항상 네트워크 우선
  if (url.pathname.startsWith('/api')) {
    event.respondWith(
      fetch(request).catch(() => {
        // 네트워크 실패 시 에러 응답
        return new Response('Network Error', { status: 503 });
      }),
    );
    return;
  }

  // ✅ 정적 자산은 캐시 우선 (Cache First)
  if (isStaticAsset(request.url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(request).then((response) => {
          // 성공적인 응답만 캐시
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        });
      }),
    );
    return;
  }

  // ✅ HTML 페이지는 네트워크 우선 (Network First)
  event.respondWith(
    fetch(request)
      .then((response) => {
        // HTML 응답을 캐시 (오프라인 대비)
        if (response.status === 200 && request.destination === 'document') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // 네트워크 실패 시 캐시에서 찾기
        return caches.match(request).then((cached) => {
          if (cached) {
            return cached;
          }
          // 기본 HTML 페이지 반환 (SPA의 경우)
          if (request.destination === 'document') {
            return caches.match('/index.html');
          }
          return new Response('Not Found', { status: 404 });
        });
      }),
  );
});
