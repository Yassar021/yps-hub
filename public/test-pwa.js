// PWA Testing Script - paste this in browser console
function testPWA() {
  console.log('🔍 Testing PWA Features...');

  // 1. Check Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      console.log('✅ Service Workers registered:', registrations.length);
      registrations.forEach(registration => {
        console.log('📍 SW Scope:', registration.scope);
        console.log('📱 SW State:', registration.active?.state || 'inactive');
      });
    });
  } else {
    console.log('❌ Service Worker not supported');
  }

  // 2. Check Manifest
  fetch('/manifest.json')
    .then(response => response.json())
    .then(manifest => {
      console.log('✅ Manifest loaded:', manifest);
      console.log('📱 App Name:', manifest.name);
      console.log('🎨 Theme Color:', manifest.theme_color);
      console.log('🖼️ Icons:', manifest.icons);
    })
    .catch(error => console.log('❌ Manifest error:', error));

  // 3. Check Install Prompt
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('✅ Install prompt fired');
    deferredPrompt = e;
  });

  // 4. Check Display Mode
  const isInStandaloneMode = (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone);
  console.log('📱 Standalone mode:', isInStandaloneMode);

  // 5. Check Connection
  if ('connection' in navigator) {
    console.log('🌐 Connection type:', navigator.connection.effectiveType);
  }

  console.log('🔍 PWA Test Complete!');
}

// Auto-run test
testPWA();