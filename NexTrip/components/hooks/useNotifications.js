// components/hooks/useNotifications.js
import { useState, useEffect, useCallback } from "react";
import * as notificationStorage from "../storage/notificationStorage";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load notifications on mount
  useEffect(() => {
    load();
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setNotifications(await notificationStorage.getNotifications());
    setLoading(false);
  }, []);

  const add = async (notif) => {
    await notificationStorage.addNotification(notif);
    await load();
  };

  const markAsRead = async (id) => {
    await notificationStorage.markAsRead(id);
    await load();
  };

  const markAllAsRead = async () => {
    await notificationStorage.markAllAsRead();
    await load();
  };

  const remove = async (id) => {
    await notificationStorage.removeNotification(id);
    await load();
  };

  const clear = async () => {
    await notificationStorage.clearNotifications();
    await load();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    loading,
    add,
    markAsRead,
    markAllAsRead,
    remove,
    clear,
    reload: load,
    unreadCount,
  };
}
