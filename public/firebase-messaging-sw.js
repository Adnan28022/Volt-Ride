importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyAEInD0-LaMWwYwH1d4zeKsoDPmPFlYP7s",
    authDomain: "voltride-11.firebaseapp.com",
    projectId: "voltride-11",
    storageBucket: "voltride-11.firebasestorage.app",
    messagingSenderId: "809682933411",
    appId: "1:809682933411:web:d786ac932e8daf33cd1116",
});

const messaging = firebase.messaging();

// ✅ Background notifications
messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/logo.png",
        badge: "/logo.png",
    });
});