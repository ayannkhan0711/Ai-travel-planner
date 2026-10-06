import api from './api';

export const notificationService = {
  getNotifications: async () => {
    try {
      const res = await api.get('/notifications/list');
      return res.notifications || [];
    } catch (e) {
      return [];
    }
  },

  getUnread: async () => {
    try {
      const res = await api.get('/notifications/unread');
      return res.notifications || [];
    } catch (e) {
      return [];
    }
  },

  markAsRead: async (id) => {
    return await api.put(`/notifications/${id}/read`);
  },

  setPriceAlert: async (data) => {
    return await api.post('/notifications/price-alert', data);
  },

  enableFlightAlert: async (data) => {
    return await api.post('/notifications/flight-alert', data);
  },
};
