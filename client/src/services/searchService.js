import api from './api';

export const searchService = {
  searchMultiModal: async (params) => {
    try {
      const res = await api.get('/search/multi-modal', { params });
      return res.data || [];
    } catch (e) {
      return [];
    }
  },

  searchFlights: async (params) => {
    try {
      const res = await api.get('/search/flights', { params });
      return res.data || [];
    } catch (e) {
      return [];
    }
  },

  searchHotels: async (params) => {
    try {
      const res = await api.get('/search/hotels', { params });
      return res.data || [];
    } catch (e) {
      return [];
    }
  },

  searchTrains: async (params) => {
    try {
      const res = await api.get('/search/trains', { params });
      return res.data || [];
    } catch (e) {
      return [];
    }
  },

  searchBuses: async (params) => {
    try {
      const res = await api.get('/search/buses', { params });
      return res.data || [];
    } catch (e) {
      return [];
    }
  },

  searchTaxis: async (params) => {
    try {
      const res = await api.get('/search/taxis', { params });
      return res.data || [];
    } catch (e) {
      return [];
    }
  },

  searchActivities: async (params) => {
    try {
      const res = await api.get('/search/activities', { params });
      return res.data || [];
    } catch (e) {
      return [];
    }
  },

  searchRestaurants: async (params) => {
    try {
      const res = await api.get('/search/restaurants', { params });
      return res.data || [];
    } catch (e) {
      return [];
    }
  },

  getSavedSearches: async () => {
    try {
      const res = await api.get('/search/saved');
      return res.data || [];
    } catch (e) {
      return [];
    }
  },

  saveSearch: async (data) => {
    return await api.post('/search/save', data);
  },
};
