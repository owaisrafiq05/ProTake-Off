import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean }>;
  register: (data: any) => Promise<{ success: boolean }>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  updateProfile: (updates: any) => Promise<{ success: boolean }>;
  forgotPassword: (email: string) => Promise<{ success: boolean }>;
  resetPassword: (token: string, email: string, password: string) => Promise<{ success: boolean }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(Cookies.get('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [token]);

  const saveToken = (token: string, rememberMe: boolean = false) => {
    setToken(token);
    const options = rememberMe ? { expires: 30 } : { expires: 1 }; // 30 days vs 1 day
    Cookies.set('token', token, options);
  };

  const removeToken = () => {
    setToken(null);
    Cookies.remove('token');
  };

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<{ success: boolean }> => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password, rememberMe });
      saveToken(res.data.data.token, rememberMe);
      setUser(res.data.data.user);
      toast.success('Login successful');
      return { success: true };
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
      return { success: false };
    }
  };

  const register = async (data: any): Promise<{ success: boolean }> => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, data);
      toast.success(res.data.message || 'Registration successful');
      return { success: true };
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
      return { success: false };
    }
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean }> => {
    try {
      const res = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      toast.success(res.data.message || 'Password reset email sent');
      return { success: true };
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to send reset email');
      return { success: false };
    }
  };

  const resetPassword = async (token: string, email: string, password: string): Promise<{ success: boolean }> => {
    try {
      const res = await axios.post(`${API_URL}/auth/reset-password`, { token, email, password });
      toast.success(res.data.message || 'Password reset successful');
      return { success: true };
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Password reset failed');
      return { success: false };
    }
  };

  const fetchUser = async (): Promise<void> => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.data.user);
    } catch (err: any) {
      removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: any): Promise<{ success: boolean }> => {
    try {
      const res = await axios.put(`${API_URL}/users/me`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.data.user);
      toast.success('Profile updated');
      return { success: true };
    } catch (err: any) {
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
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading, 
      login, 
      register, 
      logout, 
      fetchUser, 
      updateProfile,
      forgotPassword,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 