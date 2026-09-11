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
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  const d = payload.data || {};
  self.registration.showNotification('🔔 Nuevo pedido disponible', {
    body: `Pedido #${(d.key||'').slice(-4)} | ${d.cliente} -> ${d.entrega} | $${d.costo}`,
    icon: 'https://cdn-icons-png.flaticon.com/512/3774/3774089.png',
    vibrate: [400,100,400],
    requireInteraction: true,
    data: { key: d.key }
  });
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/?pedido='+e.notification.data.key));
});
