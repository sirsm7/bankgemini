const CACHE_NAME = 'gemini-prep-v2-mobile-fix'; // TUKAR VERSI DI SINI
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './ai-helper.html',
  './style.css',
  './script.js',
  './questions.js',
  './icoppdag.png',
  './manifest.json'
];

// 1. Install Service Worker & Cache Aset Statik
self.addEventListener('install', (event) => {
  // Paksa SW baru untuk aktif segera (Skip Waiting)
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching aset v2...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate & Bersihkan Cache Lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Membuang cache lama:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) // Ambil alih kawalan segera
  );
});

// 3. Fetch Strategy: Network First untuk HTML, Cache First untuk lain-lain
// Ini memastikan jika user buka page HTML, dia dapat versi latest jika ada internet.
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Strategi Khusus untuk HTML (Network First)
  if (requestUrl.pathname.endsWith('.html') || requestUrl.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          return caches.match(event.request); // Fallback ke cache jika offline
        })
    );
  } else {
    // Strategi Biasa untuk Gambar/JS/CSS (Cache First)
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});