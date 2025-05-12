

// import React from "react";
// import useOrders from "../hook/useOrders";
// import { Link } from "react-router-dom";

// const SupplierOrders = () => {
//   const { orders, loading, error } = useOrders();

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-bold text-center mb-6">My Orders</h2>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading orders...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : orders.length === 0 ? (
//         <p className="text-center text-gray-500">No orders found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {orders.map((order) => (
//             <div key={order._id} className="bg-white p-4 shadow rounded-lg">
//               <h3 className="text-lg font-semibold mb-2">
//                 {order.productId
//                   ? `Product: ${order.productId.name}`
//                   : order.auctionId
//                   ? `Auction: ${order.auctionId.title || "Untitled Auction"}`
//                   : "Unknown Product/Auction"}
//               </h3>

//               <p>Exporter: {order.exporterId?.name || "Unknown"}</p>
//               <p>Price: {order.price} Rs</p>
//               <p>Quantity: {order.quantity}</p>
//               <p>Total Value: {order.price * order.quantity}</p>
//               <p>Message: {order.message || "No message"}</p>

//               <p className="text-sm text-gray-600 mt-2">
//                 Created on: {formatDate(order.createdAt)}
//               </p>
//               <Link
//   to={`/supplier/order/${order._id}`}
//   key={order._id}
//   className="block bg-white p-4 shadow rounded-lg hover:shadow-md transition"
// >
//   <h3 className="text-lg font-semibold mb-2">
//     {order.productId
//       ? `Product: ${order.productId.name}`
//       : order.auctionId
//       ? `Auction: ${order.auctionId.title || "Untitled Auction"}`
//       : "Unknown Product/Auction"}
//   </h3>

//   <p>Exporter: {order.exporterId?.name || "Unknown"}</p>
//   <p>Price: {order.price} Rs</p>
//   <p>Quantity: {order.quantity}</p>
//   <p>Total Value: {order.price * order.quantity}</p>
//   <p>Message: {order.message || "No message"}</p>

//   <p className="text-sm text-gray-600 mt-2">
//     Created on: {formatDate(order.createdAt)}
//   </p>
// </Link>

//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SupplierOrders;


// import React from "react";
// import useOrders from "../hook/useOrders";
// import { Link } from "react-router-dom";

// const SupplierOrders = () => {
//   const { orders, loading, error } = useOrders();

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="container mx-auto p-8">
//       <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">My Orders</h2>

//       {loading ? (
//         <p className="text-center text-gray-500 text-lg">Loading orders...</p>
//       ) : error ? (
//         <p className="text-center text-red-500 text-lg">{error}</p>
//       ) : orders.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg">No orders found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
//           {orders.map((order) => (
//             <div key={order._id} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
//                {/* Display Payment and Order Status Tags */}
//                <div className="flex justify-between mb-4">
//                 {/* Display Payment Status */}
//                 {order.paymentStatus === "completed" && (
//                   <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">Payment Paid</span>
//                 )}
//                 {order.paymentStatus === "pending" && (
//                   <span className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-full">Payment Pending</span>
//                 )}
//                 {order.sampleStatus === "sample_rejected" && (
//                   <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full">Order Rejected</span>
//                 )}

//                 {/* Display Order Status */}
//                 {order.status === "completed" && (
//                   <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">Order Completed</span>
//                 )}
//                 {/* {order.status === "processing" && (
//                   <span className="px-3 py-1 bg-gray-500 text-white text-sm rounded-full">Order Processing</span>
//                 )} */}
//                 {order.status === "terminated" && (
//                   <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full">Order Terminated</span>
//                 )}
//               </div>
//               <h3 className="text-xl font-semibold text-white mb-4">
//                 {order.productId
//                   ? `Product: ${order.productId.name}`
//                   : order.auctionId
//                   ? `Auction: ${order.auctionId.title || "Untitled Auction"}`
//                   : "Unknown Product/Auction"}
//               </h3>

//               <div className="space-y-3 text-white">
//                 <p>Exporter: <span className="font-medium">{order.exporterId?.name || "Unknown"}</span></p>
//                 <p>Price: <span className="font-medium">{order.price} Rs</span></p>
//                 <p>Quantity: <span className="font-medium">{order.quantity}</span></p>
//                 <p>Total Value: <span className="font-medium">{order.price * order.quantity} Rs</span></p>
//                 <p>Message: <span className="font-medium">{order.message || "No message"}</span></p>

//                 <p className="text-sm text-gray-200 mt-2">
//                   Created on: {formatDate(order.createdAt)}
//                 </p>
//               </div>

//               <Link
//                 to={`/supplier/order/${order._id}`}
//                 className="mt-4 inline-block bg-white text-indigo-600 p-3 rounded-lg shadow-md hover:bg-indigo-600 hover:text-white transition"
//               >
//                 <span className="font-semibold">View Order Details</span>
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SupplierOrders;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import FilterOrders from "../../FilterOrders";

const SupplierOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filterCriteria, setFilterCriteria] = useState({
    sampleStatus: "",
    paymentStatus: "",
  });

  useEffect(() => {
    const fetchSupplierOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/order/orders/supplier", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.orders);
        setFilteredOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchSupplierOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter(order => {
      const matchesSample = !filterCriteria.sampleStatus || 
                          order.sampleStatus === filterCriteria.sampleStatus;
      const matchesPayment = !filterCriteria.paymentStatus || 
                           order.paymentStatus === filterCriteria.paymentStatus;
      return matchesSample && matchesPayment;
    });
    setFilteredOrders(filtered);
  }, [filterCriteria, orders]);

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-bold";
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-success-100 text-success-800`;
      case 'pending':
        return `${baseClasses} bg-accent-100 text-accent-800`;
      case 'sample_rejected':
      case 'terminated':
        return `${baseClasses} bg-error-100 text-error-800`;
      default:
        return `${baseClasses} bg-neutral-100 text-neutral-800`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-8"
    >
      <h2 className="text-2xl font-bold text-primary-800 mb-6">Order History</h2>

      {/* <FilterOrders
        filterOptions={{
          sampleStatuses: ["waiting_for_sample", "sent", "received", "sample_accepted", "sample_rejected"],
          paymentStatuses: ["pending", "completed"],
        }}
        onFilterChange={setFilterCriteria}
      /> */}
      <FilterOrders
  filterOptions={{
    sampleStatuses: ["waiting_for_sample", "sent", "received", "sample_accepted", "sample_rejected"],
    paymentStatuses: ["pending", "completed"],
  }}
  onFilterChange={(newFilters) => setFilterCriteria(newFilters)}
/>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-neutral-100 rounded-xl h-64 animate-pulse"></div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-error-50 border-l-4 border-error-500 p-4 rounded">
          <p className="text-error-700">{error}</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-surface rounded-xl shadow-sm p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-neutral-900">No orders found</h3>
          <p className="mt-1 text-neutral-500">No orders match your current filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map(order => (
            <motion.div
              key={order._id}
              whileHover={{ y: -5 }}
              className="bg-surface rounded-xl shadow-sm border border-neutral-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-primary-800">
                    {/* {order.productId?.name || "Unknown Product"} */}
                    {order.auctionId ? (
                      <div>{order.auctionId?.title}</div>
                    ) : (
                      <div>{order.productId?.name || "Unknown Products"}</div>
                    )}
                  </h3>
                  <div className="flex space-x-2">
                    {order.paymentStatus === "completed" && (
                      <span className={getStatusBadge("completed")}>Paid</span>
                    )}
                    {order.sampleStatus === "sample_rejected" && (
                      <span className={getStatusBadge("sample_rejected")}>Rejected</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 text-neutral-700">
                     <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="font-medium">
                      {order.orderId || "Unknown"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exporter:</span>
                    <span className="font-medium">{order.exporterId?.name || "Unknown"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-medium">{order.price} Rs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-medium">{order.quantity}</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-100 pt-2">
                    <span>Total:</span>
                    <span className="font-bold text-primary-700">
                      {order.price * order.quantity} Rs
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href={`/supplier/order/${order._id}`}
                    className="block text-center bg-primary-600 hover:bg-primary-700 text-surface px-4 py-2 rounded-lg transition-colors"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SupplierOrders;