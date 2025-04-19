


// import React, { useState, useEffect } from "react";
// import PaymentService from "./PaymentService";

// const PaymentForm = ({ orderId, onPaymentSubmitted }) => {
//   const [paymentMethod, setPaymentMethod] = useState("Easypaisa");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [accountName, setAccountName] = useState("");
//   const [paymentAmount, setPaymentAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [isPaymentSubmitted, setIsPaymentSubmitted] = useState(false);

//   useEffect(() => {
//     const checkPaymentStatus = async () => {
//       try {
//         const response = await PaymentService.getPaymentStatus(orderId);
//         if (response.paymentStatus === "pending" || response.paymentStatus === "completed") {
//           setIsPaymentSubmitted(true);
//         }
//       } catch (err) {
//         console.error("Error checking payment status:", err);
//       }
//     };

//     checkPaymentStatus();
//   }, [orderId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!mobileNumber || !accountName || !paymentAmount) {
//       setError("All fields are required.");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     const paymentDetails = {
//       paymentMethod,
//       mobileNumber,
//       accountName,
//       paymentAmount,
//     };

//     try {
//       const response = await PaymentService.postPaymentDetails(orderId, paymentDetails);
//       setSuccess("Payment details submitted successfully!");
//       setIsPaymentSubmitted(true);
//       if (onPaymentSubmitted) {
//         onPaymentSubmitted();
//       }
//     } catch (err) {
//       setError(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isPaymentSubmitted) {
//     return (
//       <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl border border-green-100">
//         <div className="flex flex-col items-center text-center space-y-4">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//           <h3 className="text-2xl font-bold text-gray-800">Payment Submitted</h3>
//           <p className="text-gray-600">Your payment details have been successfully submitted. You can track your payment status later.</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200"
//           >
//             View Status
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
//       <div className="text-center mb-8">
//         <h3 className="text-2xl font-bold text-gray-800">Payment Details</h3>
//         <p className="text-gray-500 mt-2">Complete your payment information</p>
//       </div>

//       {error && (
//         <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-start">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//           </svg>
//           <span>{error}</span>
//         </div>
//       )}

//       {success && (
//         <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-100 flex items-start">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//           </svg>
//           <span>{success}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
//           <select
//             value={paymentMethod}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//           >
//             <option value="Easypaisa">Easypaisa</option>
//             <option value="JazzCash">JazzCash</option>
//             <option value="SadaPay">SadaPay</option>
//             <option value="NayaPay">NayaPay</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <span className="text-gray-500">+92</span>
//             </div>
//             <input
//               type="tel"
//               value={mobileNumber}
//               onChange={(e) => setMobileNumber(e.target.value)}
//               className="w-full pl-12 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//               placeholder="300 1234567"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
//           <input
//             type="text"
//             value={accountName}
//             onChange={(e) => setAccountName(e.target.value)}
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//             placeholder="John Doe"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount (PKR)</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <span className="text-gray-500">Rs.</span>
//             </div>
//             <input
//               type="number"
//               value={paymentAmount}
//               onChange={(e) => setPaymentAmount(e.target.value)}
//               className="w-full pl-12 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//               placeholder="5000"
//               required
//             />
//           </div>
//         </div>

//         <div className="pt-2">
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 px-4 rounded-lg font-medium text-white transition duration-200 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Processing...
//               </span>
//             ) : (
//               "Submit Payment Details"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

import React, { useState, useEffect } from "react";
import PaymentService from "./PaymentService";

const PaymentForm = ({ orderId, onPaymentSubmitted }) => {
  const [paymentMethod, setPaymentMethod] = useState("Easypaisa");
  const [mobileNumber, setMobileNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isPaymentSubmitted, setIsPaymentSubmitted] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true); // New state for form visibility

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await PaymentService.getPaymentStatus(orderId);
        if (response.paymentStatus === "pending" || response.paymentStatus === "completed") {
          setIsPaymentSubmitted(true);
        }
      } catch (err) {
        console.error("Error checking payment status:", err);
      }
    };

    checkPaymentStatus();
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mobileNumber || !accountName || !paymentAmount) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const paymentDetails = {
      paymentMethod,
      mobileNumber,
      accountName,
      paymentAmount,
    };

    try {
      const response = await PaymentService.postPaymentDetails(orderId, paymentDetails);
      setSuccess("Payment details submitted successfully!");
      setIsPaymentSubmitted(true);
      if (onPaymentSubmitted) {
        onPaymentSubmitted();
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPaymentSubmitted) {
    return (
      <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl border border-green-100">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Payment Submitted</h3>
          <p className="text-gray-600">Your payment details have been successfully submitted. You can track your payment status later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200"
          >
            View Status
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header with toggle button */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Payment Details</h3>
          <p className="text-gray-500 mt-1">Complete your payment information</p>
        </div>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label={isFormVisible ? "Collapse form" : "Expand form"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${isFormVisible ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Form content - conditionally rendered based on isFormVisible */}
      {isFormVisible && (
        <div className="p-6 pt-2">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-100 flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="Easypaisa">Easypaisa</option>
                <option value="JazzCash">JazzCash</option>
                <option value="SadaPay">SadaPay</option>
                <option value="NayaPay">NayaPay</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">+92</span>
                </div>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full pl-12 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="300 1234567"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount (PKR)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">Rs.</span>
                </div>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full pl-12 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="5000"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition duration-200 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Submit Payment Details"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;