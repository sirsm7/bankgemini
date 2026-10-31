const CACHE_NAME = 'google-ed-prep-v3';
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
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) => cache.add(url))
      );
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
  if (!response) return response;

  if (response.redirected) {
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  }

  return response;
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  // KRITIKAL: Lepaskan permintaan domain luar (cross-origin CDN seperti cdn.tailwindcss.com, fonts.googleapis.com)
  // Ini mengelakkan pelanggaran CSP 'connect-src' kerana pelayar akan memuatkannya secara terus melalui 'script-src' dan 'style-src'
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  // Pengendalian navigasi halaman (HTML Navigation)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cleanResponse(cachedResponse);
          }

          // Buat panggilan rangkaian baharu dengan mod 'follow' untuk menyelesaikan lencongan pelayan (redirect)
          const networkResponse = await fetch(event.request.url, {
            headers: event.request.headers,
            credentials: event.request.credentials,
            redirect: 'follow'
          });

          return cleanResponse(networkResponse);
        } catch (error) {
          const fallback = (await caches.match('./amali-helper.html')) || (await caches.match('./index.html'));
          if (fallback) {
            return cleanResponse(fallback);
          }
          throw error;
        }
      })()
    );
    return;
  }

  // Pengendalian aset statik same-origin tempatan (CSS, JS, Imej)
  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      if (cached) {
        return cleanResponse(cached);
      }

      try {
        const networkResponse = await fetch(event.request);
        return cleanResponse(networkResponse);
      } catch (error) {
        return cached || new Response('Aset tidak dapat dimuatkan semasa luar talian.', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }
    })()
  );
});
