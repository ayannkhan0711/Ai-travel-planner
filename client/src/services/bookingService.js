import api from './api';

export const bookingService = {
  createBooking: async (bookingData) => {
    return await api.post('/bookings/create', bookingData);
  },

  listBookings: async () => {
    try {
      const res = await api.get('/bookings/list');
      return res.bookings || [];
    } catch (e) {
      return [];
    }
  },

  getBookingDetails: async (id) => {
    const res = await api.get(`/bookings/${id}`);
    return res.booking;
  },

  getBookingStatus: async (id) => {
    return await api.get(`/bookings/${id}/status`);
  },

  modifyBooking: async (id, data) => {
    return await api.put(`/bookings/${id}/modify`, data);
  },

  cancelBooking: async (id) => {
    return await api.post(`/bookings/${id}/cancel`);
  },

  printTicket: async (id) => {
    return `${api.defaults.baseURL}/bookings/${id}/print-ticket`;
  },

  emailTicket: async (id) => {
    return await api.post(`/bookings/${id}/email-ticket`);
  },
};
