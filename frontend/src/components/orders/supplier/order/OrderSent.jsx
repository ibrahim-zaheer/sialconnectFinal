

// import { useState } from "react";
// import axios from "axios";

// export const OrderSent = ({ status, orderId, onSuccess, label }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleStatusUpdate = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `/api/order/order/shipped`, // Endpoint for status update
//         { orderId }, // Send orderId in request body
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setMessage("Status updated successfully");
//       onSuccess(response.data.order); // Update the parent component state after success
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to update status");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={handleStatusUpdate}
//         disabled={isLoading || status === "order_shipped"} // Disable if already shipped
//         className={`px-6 py-3 rounded-lg transition-all duration-300 text-white font-semibold ${
//           isLoading
//             ? "bg-gray-500 cursor-not-allowed"
//             : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
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
//             Updating...
//           </>
//         ) : status === "order_shipped" ? (
//           "Order Shipped" // Display "Order Shipped" if the order is already shipped
//         ) : (
//           label // Display the custom label if it's not already shipped
//         )}
//       </button>
//       {message && <div className="text-sm mt-2 text-red-600">{message}</div>}
//     </div>
//   );
// };


// import { useState } from "react";
// import axios from "axios";

// export const OrderSent = ({ status, orderId, onSuccess, label }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleStatusUpdate = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `/api/order/order/shipped`, // Endpoint for status update
//         { orderId }, // Send orderId in request body
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setMessage("Status updated successfully");
//       onSuccess(response.data.order); // Update the parent component state after success
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to update status");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={handleStatusUpdate}
//         disabled={isLoading || status === "order_shipped"} // Disable if already shipped
//         className={`px-6 py-3 rounded-lg transition-all duration-300 text-white font-semibold ${
//           isLoading
//             ? "bg-gray-500 cursor-not-allowed"
//             : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
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
//             Updating...
//           </>
//         ) : status === "order_shipped" ? (
//           "Order Shipped" // Display "Order Shipped" if the order is already shipped
//         ) : (
//           label || "Order Sent" // Display the custom label if provided, otherwise show "Order Sent"
//         )}
//       </button>
//       {message && <div className="text-sm mt-2 text-red-600">{message}</div>}
//     </div>
//   );
// };


import { useState } from "react";
import axios from "axios";

export const OrderSent = ({ status, orderId, onSuccess, label }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [trackingId, setTrackingId] = useState(""); // State to hold the tracking ID

  const handleStatusUpdate = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/order/order/shipped`, // Endpoint for status update
        { 
          orderId, 
          trackingId,  // Include the trackingId in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Status updated successfully");
      onSuccess(response.data.order); // Update the parent component state after success
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={trackingId} 
        onChange={(e) => setTrackingId(e.target.value)} // Update trackingId on input change
        placeholder="Enter Tracking Link" 
        className="px-4 py-2 mb-4 border rounded-lg" 
      />
      <button
        onClick={handleStatusUpdate}
        disabled={isLoading || status === "order_shipped"} // Disable if already shipped
        className={`ml-3 px-6 py-2 rounded-lg transition-all duration-300 text-white font-semibold ${
          isLoading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
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
            Updating...
          </>
        ) : status === "order_shipped" ? (
          "Order Shipped" // Display "Order Shipped" if the order is already shipped
        ) : (
          label || "Order Sent" // Display the custom label if provided, otherwise show "Order Sent"
        )}
      </button>
      {message && <div className="text-sm mt-2 text-red-600">{message}</div>}
    </div>
  );
};
