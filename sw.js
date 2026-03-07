const CACHE_NAME = 'chispita-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Chispita 🔥';
  const options = {
    body: data.body || 'Tienes una nueva notificación',
    icon: '/chispita/chispita-icon-512.png',
    badge: '/chispita/chispita-icon-512.png',
    vibrate: [200, 100, 200],
    data: data,
    requireInteraction: false
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('chispitaapp.github.io') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('https://chispitaapp.github.io/chispita/index.html');
    })
  );
});
