import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { API_BASE_URL } from "../utils/ApiUrl";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// ✅ Single function — debug logs ke saath
export const requestNotificationPermission = async (userId) => {
    try {
        console.log("1. Requesting permission for userId:", userId);

        const permission = await Notification.requestPermission();
        console.log("2. Permission status:", permission);

        if (permission !== "granted") {
            console.log("Permission denied!");
            return;
        }

        console.log("3. Getting FCM token...");
        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });

        console.log("4. FCM Token:", token);

        if (token && userId) {
            console.log("5. Saving token to backend...");
            const res = await fetch(`${API_BASE_URL}/auth/save-fcm-token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ userId, fcmToken: token }),
            });
            const data = await res.json();
            console.log("6. Backend response:", data);
        } else {
            console.log("Token ya userId missing:", { token, userId });
        }
    } catch (error) {
        console.error("FCM error:", error);
    }
};

// ✅ Continuous foreground notifications
export const onMessageListener = (callback) => {
    return onMessage(messaging, (payload) => {
        callback(payload);
    });
};