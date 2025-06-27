// components/storage/notificationStorage.js
import AsyncStorage from "@react-native-async-storage/async-storage";
const NOTIFICATIONS_KEY = "NEXTRIP_NOTIFICATIONS";

// Get all notifications
export async function getNotifications() {
  const json = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
  return json ? JSON.parse(json) : [];
}

// Add a new notification (latest on top)
export async function addNotification(notification) {
  const notifications = await getNotifications();
  notifications.unshift({ ...notification, id: Date.now(), read: false });
  await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

// Mark as read by id
export async function markAsRead(id) {
  const notifications = await getNotifications();
  const updated = notifications.map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
}

// Mark all as read
export async function markAllAsRead() {
  const notifications = await getNotifications();
  const updated = notifications.map((n) => ({ ...n, read: true }));
  await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
}

// Remove a notification by id
export async function removeNotification(id) {
  const notifications = await getNotifications();
  const updated = notifications.filter((n) => n.id !== id);
  await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
}

// Clear all notifications
export async function clearNotifications() {
  await AsyncStorage.removeItem(NOTIFICATIONS_KEY);
}
