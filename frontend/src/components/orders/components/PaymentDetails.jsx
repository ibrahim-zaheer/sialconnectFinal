// src/components/PaymentDetails.js

import React, { useEffect, useState } from 'react';
import { getPaymentsForSupplier } from '../components/payment/getPaymentsForSupplier'; // Service abstraction

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPaymentsForSupplier();
        setPayments(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="payment-details">
      <h2>Payment Details</h2>
      {error && <p className="error">{error}</p>}
      {payments.length === 0 ? (
        <p>No payment details available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Payment Method</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment._id}</td>
                <td>{payment.paymentDetails.paymentMethod}</td>
                <td>{payment.paymentDetails.paymentAmount}</td>
                <td>{payment.paymentDetails.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentDetails;
