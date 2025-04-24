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
// import { Link } from "react-router-dom";
// import OrderDetailsModal from "./components/OrderDetailsModal";

// Popup modal component
// const OrderDetailsModal = ({ order, closeModal }) => {
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
//         <p><strong>Price:</strong> ${order.price}</p>
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
//         </p>
     
//         {/* <p><strong>Sample Status:</strong> {order.sampleStatus}</p>
//         <p><strong>Sample Description:</strong> {order.sampleDescription || "N/A"}</p>
//         <p><strong>Sample Proof:</strong> <a href={order.sampleProof} target="_blank" rel="noopener noreferrer">View Sample</a></p>
//         <p><strong>Agreement Status:</strong> {order.Agreement}</p>
//         <p><strong>Rejection Reason:</strong> {order.rejectionReason || "N/A"}</p>
//         <p><strong>Agreement Rejection Reason:</strong> {order.AgreementRejectionReason || "N/A"}</p> */}
//       </div>

//       // Inside the OrderDetailsModal component

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

//   // Fetch orders with payment details on component mount
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("/api/admin/orders", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setOrders(res.data.orders);
//         // Filter orders to only show those with pending local payment status
//         const pendingOrders = res.data.orders.filter(
//           (order) => order.paymentStatus?.toLowerCase() === "waiting_for_admin"
//         );
//         setFilteredOrders(pendingOrders);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch orders");
//       }
//     };

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
//         <OrderDetailsModal order={selectedOrder} closeModal={closeModal} />
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderDetailsModal from "./components/OrderDetailsModal";
import { Link } from "react-router-dom";

export default function LocalOrderPaymentList() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null); // State for the selected order
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Fetch orders with payment details on component mount
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.orders);
      // Filter orders to only show those with pending local payment status
      const pendingOrders = res.data.orders.filter(
        (order) => order.paymentStatus?.toLowerCase() === "waiting_for_admin"
      );
      setFilteredOrders(pendingOrders);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle Order ID click to open the modal
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true); // Open the modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null); // Clear the selected order
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Local Payments</h2>
      {error && <p className="text-red-600">{error}</p>}

      {filteredOrders.length === 0 && !error ? (
        <p>No pending payment orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Order ID</th>
                <th className="py-2 px-4 text-left">Exporter</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Payment Method</th>
                <th className="py-2 px-4 text-left">Payment Status</th>
                <th className="py-2 px-4 text-left">Payment Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b cursor-pointer"
                  onClick={() => handleOrderClick(order)} // Click to show details
                >
                  <td className="py-2 px-4 text-blue-500 underline">{order._id}</td> {/* Order ID is clickable */}
                  <td className="py-2 px-4">{order.exporterId?.name}</td>
                  <td className="py-2 px-4">${order.price}</td>
                  <td className="py-2 px-4">{order.quantity}</td>
                  <td className="py-2 px-4">{order.paymentDetails?.paymentMethod || "N/A"}</td>
                  <td className="py-2 px-4">{order.paymentDetails?.paymentStatus || "N/A"}</td>
                  <td className="py-2 px-4">${order.paymentDetails?.paymentAmount || "0.00"}</td>
                  <Link
  to={`/admin/order/${order._id}`}  // Dynamically pass the order ID
  className="block mt-4 p-4 bg-gray-100 rounded-lg hover:shadow-md transition"
>
  <h3 className="text-lg font-semibold mb-2 text-indigo-600">
    View Order Details
  </h3>
  <p className="text-sm text-gray-600">Click to see more details</p>
</Link>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Render the modal when an order is clicked */}
      {isModalOpen && selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          closeModal={closeModal} 
          fetchOrderDetails={fetchOrders} // Pass fetchOrderDetails as prop
        />
      )}
    </div>
  );
}
