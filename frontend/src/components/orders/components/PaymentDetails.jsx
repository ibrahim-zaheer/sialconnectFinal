import React, { useEffect, useState } from 'react';
import { getPaymentsForSupplier } from '../components/payment/getPaymentsForSupplier'; // Service abstraction
import { useNavigate } from 'react-router-dom';

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleViewDetails = (orderId) => {
    // Navigate to the SupplierOrderDetailsPage with the orderId
    navigate(`/supplier/order/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Payment Details</h2>
        
        {error && <p className="text-red-500 text-center">{error}</p>}

        {payments.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No payment details available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">Payment Method</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 border-b">{payment._id}</td>
                    <td className="py-4 px-4 border-b">{payment.paymentDetails.paymentMethod}</td>
                    <td className="py-4 px-4 border-b">Rs {payment.paymentDetails.paymentAmount}</td>
                    <td className="py-4 px-4 border-b">{payment.paymentDetails.paymentStatus}</td>
                    <td className="py-4 px-4 border-b text-center">
                      <button 
                        onClick={() => handleViewDetails(payment._id)} 
                        className="btn btn-primary btn-sm  hover:bg-indigo-700"
                      >
                        View More Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
