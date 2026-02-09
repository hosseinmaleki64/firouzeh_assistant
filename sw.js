const CACHE_NAME = 'firouzeh-assistant-v1';
const FILES_TO_CACHE = [
  '/firouzeh_assistant/',
  '/firouzeh_assistant/index.html',
  '/firouzeh_assistant/create_order.html',
  '/firouzeh_assistant/add_product.html',
  '/firouzeh_assistant/inventory.html',
  '/firouzeh_assistant/pending_orders.html',
  '/firouzeh_assistant/reports.html',
  '/firouzeh_assistant/main.css/style.css',
  '/firouzeh_assistant/main.css/foter.css',  // اگر footer.css هست
  '/firouzeh_assistant/image/icon-192.png',  
  '/firouzeh_assistant/image/icon-512.png',
  '/firouzeh_assistant/manifest.json'
  // اگر JS یا تصویر دیگه داری، اضافه کن
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});