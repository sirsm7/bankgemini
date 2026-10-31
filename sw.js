const CACHE_NAME = 'google-ed-prep-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './ai-helper.html',
  './amali-helper.html',
  './style.css',
  './script.js',
  './questions.js',
  './amali-gce.js',
  './amali-gce-data.js',
  './manifest.json',
  './icoppdag.png',
  './sitelogo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

function cleanResponse(response) {
  if (!response || !response.redirected) {
    return response;
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cleanResponse(cachedResponse);
      }

      return fetch(event.request).then((networkResponse) => {
        return cleanResponse(networkResponse);
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html').then((fallbackResponse) => {
            return cleanResponse(fallbackResponse);
          });
        }
      });
    })
  );
});
