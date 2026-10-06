import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial user from storage or provide VIP fallback
    const savedUser = authService.getCurrentUser() || {
      _id: '660e1a2b3c4d5e6f7a8b9c0d',
      firstName: 'Julian',
      lastName: 'Vanderbilt',
      email: 'julian.vanderbilt@voyagerluxe.com',
      role: 'admin',
      loyaltyPoints: 48500,
      airlineMiles: 64200,
      profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    };
    setUser(savedUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res.user) setUser(res.user);
    return res;
  };

  const register = async (userData) => {
    const res = await authService.register(userData);
    if (res.user) setUser(res.user);
    return res;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
