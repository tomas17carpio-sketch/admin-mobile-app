import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) return;
  
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const messaging = getMessaging();
    const token = await getToken(messaging, { vapidKey: "TU_VAPID_KEY" });
    console.log("Token de notificaciones:", token);
  }
};

// Mostrar notificación emergente
export const setupForegroundNotifications = () => {
  if ("Notification" in window) {
    onMessage(getMessaging(), (payload) => {
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon,
      });
    });
  }
};