importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
firebase.initializeApp({
 apiKey: "AIzaSyDGTYI2ZZnP49DbaMIpRSoGIjZrU6RAEiE",
 authDomain: "historial-kigo-xpress.firebaseapp.com",
 databaseURL: "https://historial-kigo-xpress-default-rtdb.firebaseio.com",
 projectId: "historial-kigo-xpress",
 storageBucket: "historial-kigo-xpress.firebasestorage.app",
 messagingSenderId: "571399920545",
 appId: "1:571399920545:web:aa16407753b43cbe2e89e0"
});
self.addEventListener('push', function(event) {
  const data = event.data? event.data.json() : {};
  const title = data.notification?.title || '🔔 NUEVO PEDIDO KIGO';
  const options = {
    body: data.notification?.body || 'Tienes un pedido nuevo urgente',
    icon: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
    vibrate: [500,100,500,100,1000],
    requireInteraction: true,
    tag: 'kigo-pedido'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('./'));
});
