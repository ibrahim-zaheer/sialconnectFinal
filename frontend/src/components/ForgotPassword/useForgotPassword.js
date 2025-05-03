// useForgotPassword.js
import { useState } from 'react';
import { requestOTP } from './otpService';

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sendOTP = async (email) => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await requestOTP(email);
      setMessage(res.message);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to send OTP";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return { loading, message, error, sendOTP };
};