// services/adminVerificationService.js
import axios from 'axios';

 // Adjust base URL to your backend

export const SupplierVerificationService = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`/api/adminVerification/supplierRequests`, config);
  return response.data;
};
