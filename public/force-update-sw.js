// Force update service worker and clear cache
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      console.log('Unregistering old service worker:', registration.scope);
      registration.unregister();
    }

    // Register new service worker after unregistering old ones
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('New service worker registered:', registration.scope);

        // Force update the service worker
        if (registration.waiting) {
          registration.waiting.postMessage({type: 'SKIP_WAITING'});
        }

        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New worker is ready, reload the page
              console.log('New service worker ready, reloading page...');
              window.location.reload();
            }
          });
        });
      })
      .catch(function(error) {
        console.log('Service worker registration failed:', error);
      });
  });

  // Clear all caches
  if ('caches' in window) {
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    });
  }
}