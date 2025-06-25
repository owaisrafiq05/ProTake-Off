import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [token]);

  const saveToken = (token) => {
    setToken(token);
    Cookies.set('token', token, { expires: 30 });
  };

  const removeToken = () => {
    setToken(null);
    Cookies.remove('token');
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      saveToken(res.data.data.token);
      setUser(res.data.data.user);
      toast.success('Login successful');
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      return { success: false };
    }
  };

  const register = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, data);
      toast.success(res.data.message || 'Registration successful');
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      return { success: false };
    }
  };

  const fetchUser = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.data.user);
    } catch (err) {
      removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      const res = await axios.put(`${API_URL}/users/me`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.data.user);
      toast.success('Profile updated');
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
      return { success: false };
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, fetchUser, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}; 