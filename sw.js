const CACHE_NAME = 'autofix-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
      );
    })
  );
});

// 3. Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the request is in the cache, return it
        if (response) {
          return response;
        }
        
        // Otherwise, fetch from the network
        return fetch(event.request).catch(err => {
          console.log('Fetch failed, serving offline page if available:', err);
          // You could return a custom offline page here
          throw err;
        });
      })
  );
});