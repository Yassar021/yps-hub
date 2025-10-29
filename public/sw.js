const CACHE_NAME = 'yps-hub-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icon.svg',
];

// Check if we're in development
const isDevelopment = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';

// Install event - cache resources
self.addEventListener('install', (event) => {
  if (isDevelopment) {
    // Skip caching in development
    return self.skipWaiting();
  }

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Skip SW for development assets and API calls
  if (isDevelopment ||
      event.request.url.includes('/_next/') ||
      event.request.url.includes('/api/') ||
      event.request.url.includes('hot-update') ||
      event.request.url.includes('sockjs-node')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }

        // Only cache GET requests
        if (event.request.method === 'GET') {
          return fetch(event.request).then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cache the response
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }).catch(() => {
            // Return cached version if network fails
            return caches.match(event.request);
          });
        }

        return fetch(event.request);
      })
      .catch(() => {
        // Return a fallback for cached resources
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
});

// Activate event - clean up old caches
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
    })
  );
});