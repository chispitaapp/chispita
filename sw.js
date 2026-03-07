self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Chispita 🔥';
  const options = {
    body: data.body || 'Tienes una nueva notificación',
    icon: '/chispita/chispita-icon-512.png',
    badge: '/chispita/chispita-icon-512.png',
    vibrate: [200, 100, 200],
    data: data
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('https://chispitaapp.github.io/chispita/index.html'));
});
