// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function LocalOrderPaymentList() {
//   const [orders, setOrders] = useState([]);
//       const [filteredOrders, setFilteredOrders] = useState([]);
//       const [error, setError] = useState("");
    
//       // Fetch orders with payment details on component mount
//       useEffect(() => {
//         const fetchOrders = async () => {
//           try {
//             const token = localStorage.getItem("token");
//             const res = await axios.get("/api/admin/orders", {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             });
            
//             setOrders(res.data.orders);
//             // Filter orders to only show those with pending payment status
//             // const pendingOrders = res.data.orders.filter(
//             //   order => order.paymentStatus?.toLowerCase() === "waiting_for_admin"
//             // );
//             const pendingOrders = res.data.orders.filter(
//               order => order.LocalPaymentDetails?.paymentStatus?.toLowerCase() === "pending"
//             );
//             setFilteredOrders(pendingOrders);
//           } catch (err) {
//             setError(err.response?.data?.message || "Failed to fetch orders");
//           }
//         };
    
//         fetchOrders();
//       }, []);
    
//       return (
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-4">Pending Local Payments</h2>
//           {error && <p className="text-red-600">{error}</p>}
    
//           {filteredOrders.length === 0 && !error ? (
//             <p>No pending payment orders found.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white shadow-md rounded-xl">
//                 <thead className="bg-gray-100 text-gray-700">
//                   <tr>
//                     <th className="py-2 px-4 text-left">Order ID</th>
//                     <th className="py-2 px-4 text-left">Exporter</th>
//                     <th className="py-2 px-4 text-left">Price</th>
//                     <th className="py-2 px-4 text-left">Quantity</th>
//                     <th className="py-2 px-4 text-left">Payment Method</th>
//                     <th className="py-2 px-4 text-left">Payment Status</th>
//                     <th className="py-2 px-4 text-left">Payment Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredOrders.map((order) => (
//                     <tr key={order._id} className="border-b">
//                       <td className="py-2 px-4">{order._id}</td>
//                       <td className="py-2 px-4">{order.exporterId?.name}</td>
//                       <td className="py-2 px-4">${order.price}</td>
//                       <td className="py-2 px-4">{order.quantity}</td>
//                       <td className="py-2 px-4">{order.paymentDetails?.paymentMethod || "N/A"}</td>
//                       <td className="py-2 px-4">{order.paymentDetails?.paymentStatus || "N/A"}</td>
//                       <td className="py-2 px-4">${order.paymentDetails?.paymentAmount || "0.00"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       );
// }







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import OrderDetailsModal from "./components/OrderDetailsModal";
// import { Link } from "react-router-dom";

// export default function LocalOrderPaymentList() {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [error, setError] = useState("");
//   const [selectedOrder, setSelectedOrder] = useState(null); // State for the selected order
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

//   // Fetch orders with payment details on component mount
//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("/api/admin/orders", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setOrders(res.data.orders);
//       // Filter orders to only show those with pending local payment status
//       const pendingOrders = res.data.orders.filter(
//         (order) => order.paymentStatus?.toLowerCase() === "waiting_for_admin"
//       );
//       setFilteredOrders(pendingOrders);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch orders");
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // Handle Order ID click to open the modal
//   const handleOrderClick = (order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true); // Open the modal
//   };

//   // Close the modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null); // Clear the selected order
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Pending Local Paymentss</h2>
//       {error && <p className="text-red-600">{error}</p>}

//       {filteredOrders.length === 0 && !error ? (
//         <p>No pending payment orders found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white shadow-md rounded-xl">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="py-2 px-4 text-left">Order ID</th>
//                 <th className="py-2 px-4 text-left">Exporter</th>
//                 <th className="py-2 px-4 text-left">Price</th>
//                 <th className="py-2 px-4 text-left">Quantity</th>
//                 <th className="py-2 px-4 text-left">Payment Method</th>
//                 <th className="py-2 px-4 text-left">Payment Status</th>
//                 <th className="py-2 px-4 text-left">Payment Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map((order) => (
//                 <tr
//                   key={order._id}
//                   className="border-b cursor-pointer"
//                   onClick={() => handleOrderClick(order)} // Click to show details
//                 >
//                   <td className="py-2 px-4 text-blue-500 underline">{order._id}</td> {/* Order ID is clickable */}
//                   <td className="py-2 px-4">{order.exporterId?.name}</td>
//                   <td className="py-2 px-4">${order.price}</td>
//                   <td className="py-2 px-4">{order.quantity}</td>
//                   <td className="py-2 px-4">{order.paymentDetails?.paymentMethod || "N/A"}</td>
//                   <td className="py-2 px-4">{order.paymentDetails?.paymentStatus || "N/A"}</td>
//                   <td className="py-2 px-4">${order.paymentDetails?.paymentAmount || "0.00"}</td>
//                   <Link
//   to={`/admin/order/${order._id}`}  // Dynamically pass the order ID
//   className="block mt-4 p-4 bg-gray-100 rounded-lg hover:shadow-md transition"
// >
//   <h3 className="text-lg font-semibold mb-2 text-indigo-600">
//     View Order Details
//   </h3>
//   <p className="text-sm text-gray-600">Click to see more details</p>
// </Link>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Render the modal when an order is clicked */}
//       {isModalOpen && selectedOrder && (
//         <OrderDetailsModal 
//           order={selectedOrder} 
//           closeModal={closeModal} 
//           fetchOrderDetails={fetchOrders} // Pass fetchOrderDetails as prop
//         />
//       )}
//     </div>
//   );
// }

// LocalOrderPaymentList.jsx



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import OrderDetailsModal from "./components/OrderDetailsModal";
// import { Link } from "react-router-dom";

// export default function LocalOrderPaymentList() {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [error, setError] = useState("");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("/api/admin/orders", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setOrders(res.data.orders);
//       const pendingOrders = res.data.orders.filter(
//         (order) => order.paymentStatus?.toLowerCase() === "waiting_for_admin"
//       );
//       setFilteredOrders(pendingOrders);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch orders");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleOrderClick = (order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
//       <div className="p-6 border-b border-neutral-200">
//         <h2 className="text-xl font-semibold text-neutral-800">Pending Local Payments</h2>
//         <p className="text-sm text-neutral-500 mt-1">Orders awaiting local payment confirmation</p>
//       </div>
      
//       <div className="p-6">
//         {error && (
//           <div className="mb-4 p-4 bg-error-50 text-error-700 rounded-lg">
//             {error}
//           </div>
//         )}

//         {isLoading ? (
//           <div className="flex justify-center items-center h-40">
//             <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : filteredOrders.length === 0 ? (
//           <div className="text-center py-8">
//             <p className="text-neutral-500">No pending payment orders found</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-neutral-200">
//               <thead className="bg-neutral-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Order ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Exporter</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Price</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Quantity</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Payment Method</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-neutral-200">
//                 {filteredOrders.map((order) => (
//                   <tr 
//                     key={order._id} 
//                     className="hover:bg-neutral-50 transition-colors cursor-pointer"
//                     onClick={() => handleOrderClick(order)}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600 hover:underline">
//                       {order._id}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{order.exporterId?.name || '—'}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">${order.price?.toFixed(2) || '0.00'}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{order.quantity}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
//                       <span className="capitalize">
//                         {order.paymentDetails?.paymentMethod?.replace(/_/g, ' ') || "N/A"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         order.paymentStatus === 'waiting_for_admin' 
//                           ? 'bg-warning-100 text-warning-800' 
//                           : 'bg-neutral-100 text-neutral-800'
//                       }`}>
//                         {order.paymentStatus?.replace(/_/g, ' ') || "N/A"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
//                       ${order.paymentDetails?.paymentAmount?.toFixed(2) || '0.00'}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {isModalOpen && selectedOrder && (
//         <OrderDetailsModal 
//           order={selectedOrder} 
//           closeModal={closeModal} 
//           fetchOrderDetails={fetchOrders}
//         />
//       )}
//     </div>
//   );
// }







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import ConfirmPaymentButton from "./components/ConfirmPaymentButton";
// // import OrderDetailsModal from "./components/OrderDetailsModal";


// const OrderDetailsModal = ({ order, closeModal,refreshOrders  }) => {
//   const [isImagePopupOpen, setIsImagePopupOpen] = useState(false); // State to control image popup visibility
//   const [imageUrl, setImageUrl] = useState(""); // State to store the image URL

//   // Handle image click to open the image popup
//   const handleImageClick = (imageUrl) => {
//     setImageUrl(imageUrl); // Store the image URL
//     setIsImagePopupOpen(true); // Open the image popup
//   };
//   const closeImagePopup = () => {
//     setIsImagePopupOpen(false); // Close the image popup
//     setImageUrl(""); // Clear the image URL
//   };
//   const handleSuccess = (message) => {
//     alert(message); // You can update this to show a notification or update UI after successful payment confirmation
//     refreshOrders(); 
//     closeModal(); // Close the modal after payment confirmation
//   };

//   const handleError = (errorMessage) => {
//     alert(errorMessage); // You can update this to show a notification with the error
//   };
//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
//         {/* Close button */}
//         <button 
//           onClick={closeModal} 
//           className="absolute top-2 right-2 text-gray-500 font-bold text-xl"
//         >
//           X
//         </button>
//         <h2 className="text-xl font-bold mb-4">Order Details - {order._id}</h2>
//         <p><strong>Exporter:</strong> {order.exporterId?.name}</p>
//         <p><strong>Supplier:</strong> {order.supplierId?.name}</p>
//         <p><strong>Price:</strong> Rs {order.price}</p>
//         <p><strong>Quantity:</strong> {order.quantity}</p>
//         <p><strong>Status:</strong> {order.status}</p>
//         <p><strong>Account Name:</strong> {order.LocalPaymentDetails?.accountName || order.paymentDetails?.accountName || "N/A"}</p>

//         <p><strong>Payment Method:</strong> {order.LocalPaymentDetails?.paymentMethod || order.paymentDetails?.paymentMethod || "N/A"}</p>
//         <p><strong>Payment Status:</strong> {order.LocalPaymentDetails?.paymentStatus || order.paymentDetails?.paymentStatus || "N/A"}</p>
//         <p><strong>Payment Amount:</strong> ${order.LocalPaymentDetails?.paymentAmount || order.paymentDetails?.paymentAmount || "0.00"}</p>
//           {/* Payment Proof button */}
//           <p>
//           <strong>Payment Proof:</strong> 
//           {order.LocalPaymentDetails?.localPaymentProof || order.paymentDetails?.localPaymentProof ? (
//             <button 
//               onClick={() => handleImageClick(order.LocalPaymentDetails?.localPaymentProof || order.paymentDetails?.localPaymentProof)}
//               className="text-blue-500 underline cursor-pointer"
//             >
//               View Proof
//             </button>
//           ) : (
//             "No Proof Available"
//           )}
          
//        {/* Conditionally render the Confirm Payment Button */}
//        {order.LocalPaymentDetails?.paymentStatus?.toLowerCase() === 'detailsgiven' && (
//           <div className="mt-4">
//             <ConfirmPaymentButton 
//               orderId={order._id}
//               onSuccess={handleSuccess} 
//               onError={handleError}
//             />
//           </div>
//         )}
//         </p>
     
        
//       </div>

     

// {/* Image Popup Modal */}
// {isImagePopupOpen && imageUrl && (
//   <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
//     <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
//       <button 
//         onClick={closeImagePopup} 
//         className="absolute top-2 right-2 text-gray-500 font-bold text-xl"
//       >
//         X
//       </button>
//       <img 
//         src={imageUrl} 
//         alt="Payment Proof" 
//         className="w-full h-auto max-w-4xl max-h-[80vh] object-contain rounded-lg" 
//       />
//     </div>
//   </div>
// )}

//     </div>
//   );
// };



// export default function LocalOrderPaymentList() {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [error, setError] = useState("");
//   const [selectedOrder, setSelectedOrder] = useState(null); // State for the selected order
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   // // Fetch orders with payment details on component mount
//   // useEffect(() => {
//   //   const fetchOrders = async () => {
//   //     try {
//   //       const token = localStorage.getItem("token");
//   //       const res = await axios.get("/api/admin/orders", {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       });

//   //       setOrders(res.data.orders);
//   //       // Filter orders to only show those with pending local payment status
//   //       const pendingOrders = res.data.orders.filter(
//   //         (order) => order.paymentStatus?.toLowerCase() === "waiting_for_admin"
//   //       );
//   //       setFilteredOrders(pendingOrders);
//   //     } catch (err) {
//   //       setError(err.response?.data?.message || "Failed to fetch orders");
//   //     }
//   //   };

//   //   fetchOrders();
//   // }, []);

  
//   const fetchOrders = async () => {
//     setIsRefreshing(true);
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("/api/admin/orders", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setOrders(res.data.orders);
//       const pendingOrders = res.data.orders.filter(
//         (order) => order.paymentStatus?.toLowerCase() === "waiting_for_admin"
//       );
//       setFilteredOrders(pendingOrders);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch orders");
//     } finally {
//       setIsRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);


//   const handleRefresh = () => {
//     fetchOrders();
//   };
//   // Handle Order ID click to open the modal
//   const handleOrderClick = (order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true); // Open the modal
//   };

//   // Close the modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null); // Clear the selected order
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Pending Local Payments</h2>
//       {error && <p className="text-red-600">{error}</p>}

//       {filteredOrders.length === 0 && !error ? (
//         <p>No pending payment orders found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white shadow-md rounded-xl">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="py-2 px-4 text-left">Order ID</th>
//                 <th className="py-2 px-4 text-left">Exporter</th>
//                 <th className="py-2 px-4 text-left">Price</th>
//                 <th className="py-2 px-4 text-left">Quantity</th>
//                 <th className="py-2 px-4 text-left">Payment Method</th>
//                 <th className="py-2 px-4 text-left">Payment Status</th>
//                 <th className="py-2 px-4 text-left">Payment Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map((order) => (
//                 <tr
//                   key={order._id}
//                   className="border-b cursor-pointer"
//                   onClick={() => handleOrderClick(order)} // Click to show details
//                 >
//                   <td className="py-2 px-4 text-blue-500 underline">{order._id}</td> {/* Order ID is clickable */}
//                   <td className="py-2 px-4">{order.exporterId?.name}</td>
//                   <td className="py-2 px-4">Rs {order.price}</td>
//                   <td className="py-2 px-4">{order.quantity}</td>
//                   <td className="py-2 px-4">{order.paymentDetails?.paymentMethod || "N/A"}</td>
//                   <td className="py-2 px-4">{order.paymentDetails?.paymentStatus || "N/A"}</td>
//                   <td className="py-2 px-4">Rs {order.paymentDetails?.paymentAmount || "0.00"}</td>
//                   <Link
//   to={`/admin/order/${order._id}`}  // Dynamically pass the order ID
//   className="block mt-4 p-4 bg-gray-100 rounded-lg hover:shadow-md transition"
// >
//   <h3 className="text-lg font-semibold mb-2 text-indigo-600">
//     View Order Details
//   </h3>
//   <p className="text-sm text-gray-600">Click to see more details</p>
// </Link>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Render the modal when an order is clicked */}
//       {isModalOpen && selectedOrder && (
//         <OrderDetailsModal order={selectedOrder} closeModal={closeModal} refreshOrders={fetchOrders} />
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ConfirmPaymentButton from "./components/ConfirmPaymentButton";
const OrderDetailsModal = ({ order, closeModal, refreshOrders }) => {
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageClick = (imageUrl) => {
    setImageUrl(imageUrl);
    setIsImagePopupOpen(true);
  };
  const closeImagePopup = () => {
    setIsImagePopupOpen(false);
    setImageUrl("");
  };

  const handleSuccess = (message) => {
    alert(message);
    refreshOrders();
    closeModal();
  };

  const handleError = (errorMessage) => {
    alert(errorMessage);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative max-w-3xl">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 font-bold text-xl"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Details</h2>
        <p><strong>Exporter:</strong> {order.exporterId?.name}</p>
        <p><strong>Supplier:</strong> {order.supplierId?.name}</p>
        <p><strong>Price:</strong> Rs {order.price}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Account Name:</strong> {order.LocalPaymentDetails?.accountName || "N/A"}</p>
        <p><strong>Payment Method:</strong> {order.LocalPaymentDetails?.paymentMethod || "N/A"}</p>
        <p><strong>Payment Status:</strong> {order.LocalPaymentDetails?.paymentStatus || "N/A"}</p>
        <p><strong>Payment Amount:</strong> Rs {order.LocalPaymentDetails?.paymentAmount || "0.00"}</p>
        
        <p><strong>Payment Proof:</strong> 
          {order.LocalPaymentDetails?.localPaymentProof ? (
            <button 
              onClick={() => handleImageClick(order.LocalPaymentDetails?.localPaymentProof)}
              className="text-blue-500 underline cursor-pointer"
            >
              View Proof
            </button>
          ) : (
            "No Proof Available"
          )}
        </p>

        {/* Conditionally render the Confirm Payment Button */}
        {order.LocalPaymentDetails?.paymentStatus?.toLowerCase() === 'detailsgiven' && (
          <div className="mt-4">
            <ConfirmPaymentButton 
              orderId={order._id}
              onSuccess={handleSuccess} 
              onError={handleError}
            />
          </div>
        )}
      </div>

      {/* Image Popup Modal */}
      {isImagePopupOpen && imageUrl && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative max-w-4xl">
            <button 
              onClick={closeImagePopup} 
              className="absolute top-2 right-2 text-gray-500 font-bold text-xl"
            >
              X
            </button>
            <img 
              src={imageUrl} 
              alt="Payment Proof" 
              className="w-full h-auto max-w-4xl max-h-[80vh] object-contain rounded-lg" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default function LocalOrderPaymentList() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchOrders = async () => {
    setIsRefreshing(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.orders);
      const pendingOrders = res.data.orders.filter(
        (order) => order.paymentStatus?.toLowerCase() === "waiting_for_admin"
      );
      setFilteredOrders(pendingOrders);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefresh = () => {
    fetchOrders();
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Pending Local Payments</h2>
      {error && <p className="text-red-600">{error}</p>}

      {filteredOrders.length === 0 && !error ? (
        <p className="text-gray-600">No pending payment orders found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white p-4">
          <table className="min-w-full table-auto bg-white rounded-xl">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Exporter</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Payment Method</th>
                <th className="py-3 px-6 text-left">Payment Status</th>
                <th className="py-3 px-6 text-left">Payment Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleOrderClick(order)}
                >
                  <td className="py-3 px-6 text-blue-500 underline">{order._id}</td>
                  <td className="py-3 px-6">{order.exporterId?.name}</td>
                  <td className="py-3 px-6">Rs {order.price}</td>
                  <td className="py-3 px-6">{order.quantity}</td>
                  <td className="py-3 px-6">{order.paymentDetails?.paymentMethod || "N/A"}</td>
                  <td className="py-3 px-6">{order.paymentDetails?.paymentStatus || "N/A"}</td>
                  <td className="py-3 px-6">Rs {order.paymentDetails?.paymentAmount || "0.00"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          closeModal={closeModal}
          refreshOrders={fetchOrders}
        />
      )}
    </div>
  );
}
