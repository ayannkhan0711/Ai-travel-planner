import api from './api';

export const travelInfoService = {
  getVisaInfo: async (fromCountry, toCountry) => {
    const res = await api.get(`/travel-info/visa/${encodeURIComponent(fromCountry)}/${encodeURIComponent(toCountry)}`);
    return res.data;
  },

  getHealthInfo: async (country) => {
    const res = await api.get(`/travel-info/health/${encodeURIComponent(country)}`);
    return res.data;
  },

  getAdvisories: async (country) => {
    const res = await api.get(`/travel-info/advisories/${encodeURIComponent(country)}`);
    return res.data;
  },

  convertCurrency: async (amount, from, to) => {
    return await api.post('/travel-info/currency-convert', { amount, from, to });
  },

  getWeather: async (destination, date = 'today') => {
    const res = await api.get(`/travel-info/weather/${encodeURIComponent(destination)}/${date}`);
    return res.weather;
  },

  getRequiredDocuments: async (country) => {
    const res = await api.get(`/travel-info/documents/${encodeURIComponent(country)}`);
    return res.documents;
  },
};
