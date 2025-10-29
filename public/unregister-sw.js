// Paste this in browser console to unregister all service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister()
        .then(function(boolean) {
          console.log('Service Worker unregistered:', boolean);
        });
    }
  });
}

// Also clear caches
if ('caches' in window) {
  caches.keys().then(function(names) {
    for(let name of names) {
      caches.delete(name);
      console.log('Cache deleted:', name);
    }
  });
}