// useOTPVerification.js
import { useState } from 'react';
import { verifyOTPAndReset } from './otpService';

export const useOTPVerification = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const verifyAndReset = async (payload) => {
    setLoading(true);
    try {
      const res = await verifyOTPAndReset(payload);
      setStatus(res.message);
    } catch (err) {
      setStatus(err.response?.data?.message || "OTP Verification Failed");
    }
    setLoading(false);
  };

  return { loading, status, verifyAndReset };
};
