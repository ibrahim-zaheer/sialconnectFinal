import React, { useState } from 'react';
import axios from 'axios';

// Reusable Confirm Payment Button component
const ConfirmSupplierPaymentButton = ({ orderId, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleConfirmPayment = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const token = localStorage.getItem('token');
      
      // POST request to confirm local payment by admin
      const response = await axios.post(
        '/api/admin/orders/supplier/mark-payment-completed',
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Call onSuccess if payment confirmation is successful
      onSuccess(response.data.message);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error confirming payment');
      // Call onError if there's any error
      onError(error.response?.data?.message || 'Error confirming payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleConfirmPayment}
        disabled={loading}
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:bg-gray-300"
      >
        {loading ? 'Confirming Payment...' : 'Confirm Payment'}
      </button>
      {errorMessage && (
        <div className="text-red-500 mt-2">{errorMessage}</div>
      )}
    </div>
  );
};

export default ConfirmSupplierPaymentButton;
