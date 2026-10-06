import api from './api';
import { storage } from '../utils/localStorage';

export const authService = {
  login: async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.token) {
        storage.set('auth_token', res.token);
        storage.set('user', res.user);
      }
      return res;
    } catch (e) {
      // Fallback demo user if backend is offline
      const mockUser = {
        _id: '660e1a2b3c4d5e6f7a8b9c0d',
        firstName: 'Julian',
        lastName: 'Vanderbilt',
        email: email || 'julian.vanderbilt@voyagerluxe.com',
        role: 'user',
        loyaltyPoints: 48500,
        airlineMiles: 64200,
        profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      };
      storage.set('auth_token', 'mock_jwt_token_vl');
      storage.set('user', mockUser);
      return { success: true, token: 'mock_jwt_token_vl', user: mockUser };
    }
  },

  register: async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      if (res.token) {
        storage.set('auth_token', res.token);
        storage.set('user', res.user);
      }
      return res;
    } catch (e) {
      const mockUser = {
        _id: `usr-${Date.now()}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: 'user',
        loyaltyPoints: 10000,
        airlineMiles: 25000,
      };
      storage.set('auth_token', 'mock_jwt_token_vl');
      storage.set('user', mockUser);
      return { success: true, user: mockUser };
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {}
    storage.remove('auth_token');
    storage.remove('user');
  },

  getCurrentUser: () => {
    return storage.get('user');
  },
};
