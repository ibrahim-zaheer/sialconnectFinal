// import { useState } from "react";
// import axios from "axios";

// export const OrderReceived = ({ status, orderId, onSuccess, label }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleStatusUpdate = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `/api/order/order/received`, // Endpoint for confirming order receipt
//         { orderId }, // Send orderId in request body
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setMessage("Order confirmed as received");
//       onSuccess(response.data.order); // Update the parent component state after success
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to confirm order receipt");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={handleStatusUpdate}
//         disabled={isLoading || status === "order_received"} // Disable if already received
//         className={`px-6 py-3 rounded-lg transition-all duration-300 text-white font-semibold ${
//           isLoading
//             ? "bg-gray-500 cursor-not-allowed"
//             : "bg-green-600 hover:bg-green-700 active:bg-green-800"
//         }`}
//       >
//         {isLoading ? (
//           <>
//             <svg
//               className="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               ></circle>
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               ></path>
//             </svg>
//             Confirming...
//           </>
//         ) : (
//           label
//         )}
//       </button>
//       {message && <div className="text-sm mt-2 text-green-600">{message}</div>}
//     </div>
//   );
// };

import { useState } from "react";
import axios from "axios";

export const OrderReceived = ({ status, orderId, onSuccess, label }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleStatusUpdate = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/order/order/received`, // Endpoint for confirming order receipt
        { orderId }, // Send orderId in request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Order confirmed as received");
      onSuccess(response.data.order); // Update the parent component state after success
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to confirm order receipt");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleStatusUpdate}
        disabled={isLoading || status === "order_received"} // Disable if already received
        className={`px-6 py-3 rounded-lg transition-all duration-300 text-white font-semibold ${
          isLoading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 active:bg-green-800"
        }`}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Confirming...
          </>
        ) : status === "order_received" ? (
          "Order Received" // Display "Order Received" if the order is already marked as received
        ) : (
          label || "Order Received" // Display the custom label if provided, otherwise show "Order Received"
        )}
      </button>
      {message && <div className="text-sm mt-2 text-green-600">{message}</div>}
    </div>
  );
};