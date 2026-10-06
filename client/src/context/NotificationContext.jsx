import React, { createContext, useContext, useState, useEffect } from 'react';
import { notificationService } from '../services/notificationService';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      _id: 'notif-1',
      title: 'Booking Confirmed: Emirates First Suite',
      message: 'Suite 02A confirmed on flight EK 202 to Paris. Chauffeur dispatched.',
      isRead: false,
      createdAt: new Date(),
    },
    {
      _id: 'notif-2',
      title: 'Price Advantage Alert',
      message: 'Panling Overwater Villas dropped by 18% for late November.',
      isRead: false,
      createdAt: new Date(Date.now() - 3600000),
    },
  ]);

  const [unreadCount, setUnreadCount] = useState(2);

  const markAsRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
    try {
      await notificationService.markAsRead(id);
    } catch (e) {}
  };

  const addNotification = (notif) => {
    setNotifications((prev) => [
      { _id: `notif-${Date.now()}`, isRead: false, createdAt: new Date(), ...notif },
      ...prev,
    ]);
    setUnreadCount((prev) => prev + 1);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
