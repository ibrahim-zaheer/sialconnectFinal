// otpService.js
import axios from 'axios';

export const requestOTP = async (email) => {
  const res = await axios.post('/api/auth/forgot-password', { email });
  return res.data;
};

export const verifyOTPAndReset = async (data) => {
  const res = await axios.post('/api/auth/reset-password', data);
  return res.data;
};
