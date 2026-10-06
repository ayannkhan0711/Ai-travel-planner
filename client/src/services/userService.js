import api from './api';

export const userService = {
  getProfile: async () => {
    const res = await api.get('/user/profile');
    return res.user;
  },

  updateProfile: async (userData) => {
    return await api.put('/user/profile', userData);
  },

  updatePreferences: async (preferences) => {
    return await api.put('/user/preferences', preferences);
  },

  getSettings: async () => {
    const res = await api.get('/user/settings');
    return res.settings;
  },

  updateSettings: async (settings) => {
    return await api.put('/user/settings', settings);
  },
};
