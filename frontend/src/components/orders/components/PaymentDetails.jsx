// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { getPaymentsForSupplier } from '../components/payment/getPaymentsForSupplier';
// import { useNavigate } from 'react-router-dom';

// const PaymentDetails = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         setLoading(true);
//         const data = await getPaymentsForSupplier();
//         setPayments(data);
//       } catch (error) {
//         setError(error.message || "Failed to load payment details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   const handleViewDetails = (orderId) => {
//     navigate(`/supplier/order/${orderId}`);
//   };

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'completed':
//         return 'bg-success-100 text-success-800';
//       case 'pending':
//         return 'bg-accent-100 text-accent-800';
//       case 'failed':
//         return 'bg-error-100 text-error-800';
//       default:
//         return 'bg-neutral-100 text-neutral-800';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="max-w-7xl mx-auto"
//       >
//         <div className="bg-surface rounded-xl shadow-sm overflow-hidden">
//           <div className="p-6 border-b border-neutral-100">
//             <h2 className="text-2xl font-bold text-primary-800">Payment History</h2>
//             <p className="text-neutral-600 mt-1">View all your transaction details</p>
//           </div>

//           {loading ? (
//             <div className="p-6">
//               <div className="animate-pulse space-y-4">
//                 {[...Array(5)].map((_, i) => (
//                   <div key={i} className="h-16 bg-neutral-100 rounded"></div>
//                 ))}
//               </div>
//             </div>
//           ) : error ? (
//             <div className="p-6">
//               <div className="bg-error-50 border-l-4 border-error-500 p-4 rounded">
//                 <div className="flex items-center">
//                   <svg className="h-5 w-5 text-error-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                   <p className="text-error-700">{error}</p>
//                 </div>
//               </div>
//             </div>
//           ) : payments.length === 0 ? (
//             <div className="p-8 text-center">
//               <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <h3 className="mt-2 text-lg font-medium text-neutral-900">No payments found</h3>
//               <p className="mt-1 text-neutral-500">You don't have any payment records yet.</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-neutral-200">
//                 <thead className="bg-neutral-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Order ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Method</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-surface divide-y divide-neutral-200">
//                   {payments.map((payment) => (
//                     <motion.tr 
//                       key={payment._id}
//                       whileHover={{ backgroundColor: 'rgba(244, 245, 247, 1)' }}
//                       className="transition-colors"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-700">
//                         #{payment._id.slice(-6).toUpperCase()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 capitalize">
//                         {payment.paymentDetails.paymentMethod}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary-800">
//                         Rs {payment.paymentDetails.paymentAmount.toLocaleString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
//                         {new Date(payment.createdAt).toLocaleDateString('en-US', {
//                           year: 'numeric',
//                           month: 'short',
//                           day: 'numeric'
//                         })}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.paymentDetails.paymentStatus)}`}>
//                           {payment.paymentDetails.paymentStatus}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <button
//                           onClick={() => handleViewDetails(payment._id)}
//                           className="text-primary-600 hover:text-primary-900 transition-colors"
//                         >
//                           View Details →
//                         </button>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default PaymentDetails;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getPaymentsForSupplier } from '../components/payment/getPaymentsForSupplier';
import { useNavigate } from 'react-router-dom';

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const data = await getPaymentsForSupplier();
        // Ensure data is an array and has proper structure
        setPayments(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error.message || "Failed to load payment details");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleViewDetails = (orderId) => {
    navigate(`/supplier/order/${orderId}`);
  };

  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'completed':
        return 'bg-success-100 text-success-800';
      case 'pending':
        return 'bg-accent-100 text-accent-800';
      case 'failed':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  // Safe access to payment details
  const getPaymentAmount = (payment) => {
    const amount = payment?.paymentDetails?.paymentAmount;
    return typeof amount === 'number' ? amount : 0;
  };

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        <div className="bg-surface rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-neutral-100">
            <h2 className="text-2xl font-bold text-primary-800">Payment History</h2>
            <p className="text-neutral-600 mt-1">View all your transaction details</p>
          </div>

          {loading ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-neutral-100 rounded"></div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="p-6">
              <div className="bg-error-50 border-l-4 border-error-500 p-4 rounded">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-error-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-error-700">{error}</p>
                </div>
              </div>
            </div>
          ) : payments.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-neutral-900">No payments found</h3>
              <p className="mt-1 text-neutral-500">You don't have any payment records yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-surface divide-y divide-neutral-200">
                  {payments.map((payment) => (
                    <motion.tr 
                      key={payment._id || Math.random().toString(36).substr(2, 9)}
                      whileHover={{ backgroundColor: 'rgba(244, 245, 247, 1)' }}
                      className="transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-700">
                        #{payment._id ? payment._id.slice(-6).toUpperCase() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 capitalize">
                        {payment?.paymentDetails?.paymentMethod || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary-800">
                        Rs {getPaymentAmount(payment).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment?.paymentDetails?.paymentStatus)}`}>
                          {payment?.paymentDetails?.paymentStatus || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => payment._id && handleViewDetails(payment._id)}
                          className="text-primary-600 hover:text-primary-900 transition-colors"
                          disabled={!payment._id}
                        >
                          View Details →
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentDetails;