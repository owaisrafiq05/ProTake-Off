import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const email = params.get('email');
    if (!token || !email) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }
    axios.get(`${API_URL}/auth/verify-email?token=${token}&email=${email}`)
      .then(res => {
        setStatus('success');
        setMessage('Email verified successfully! Redirecting to login...');
        toast.success('Email verified! You can now log in.');
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch(err => {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed.');
        toast.error(err.response?.data?.message || 'Verification failed.');
      });
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        {status === 'loading' && <div className="mb-4 animate-spin h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full mx-auto" />}
        <h2 className="text-2xl font-bold mb-2">Verify Email</h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail; 