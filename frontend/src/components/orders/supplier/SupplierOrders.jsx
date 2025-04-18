

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


import React, { useEffect, useState } from "react";
import axios from "axios"; // Adjust path if needed
import { Link } from "react-router-dom";
import FilterOrders from "../../FilterOrders"; // Import the FilterOrders component

const SupplierOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [filterCriteria, setFilterCriteria] = useState({
    sampleStatus: "",
    paymentStatus: "",
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchSupplierOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/order/orders/supplier", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data.orders);
      setFilteredOrders(response.data.orders);  // Set initial filtered orders
      setLoading(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to fetch orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplierOrders();
  }, []);

  useEffect(() => {
    // Apply filters whenever filter criteria changes
    const filtered = orders.filter((order) => {
      const matchesSampleStatus =
        filterCriteria.sampleStatus === "" || order.sampleStatus === filterCriteria.sampleStatus;
      const matchesPaymentStatus =
        filterCriteria.paymentStatus === "" || order.paymentStatus === filterCriteria.paymentStatus;

      return matchesSampleStatus && matchesPaymentStatus;
    });
    setFilteredOrders(filtered);
  }, [filterCriteria, orders]);

  if (loading) return <p className="text-center mt-5">Loading orders...</p>;
  if (message) return <p className="text-center text-red-500 mt-5">{message}</p>;

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">My Orders</h2>

      {/* Filter Section */}
      <FilterOrders
        filterOptions={{
          sampleStatuses: ["waiting_for_sample", "sent", "received", "sample_accepted", "sample_rejected"],
          paymentStatuses: ["pending", "completed"],
        }}
        onFilterChange={(name, value) => {
          setFilterCriteria((prev) => ({
            ...prev,
            [name]: value,
          }));
        }}
      />

      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              {/* Display Payment and Order Status Tags */}
              <div className="flex justify-between mb-4">
                {order.paymentStatus === "completed" && (
                  <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">Payment Paid</span>
                )}
                {order.paymentStatus === "pending" && (
                  <span className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-full">Payment Pending</span>
                )}
                {order.sampleStatus === "sample_rejected" && (
                  <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full">Order Rejected</span>
                )}
                {order.status === "completed" && (
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">Order Completed</span>
                )}
                {order.status === "terminated" && (
                  <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full">Order Terminated</span>
                )}
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">
                {order.productId
                  ? `Product: ${order.productId.name}`
                  : order.auctionId
                  ? `Auction: ${order.auctionId.title || "Untitled Auction"}`
                  : "Unknown Product/Auction"}
              </h3>

              <div className="space-y-3 text-white">
                <p>Exporter: <span className="font-medium">{order.exporterId?.name || "Unknown"}</span></p>
                <p>Price: <span className="font-medium">{order.price} Rs</span></p>
                <p>Quantity: <span className="font-medium">{order.quantity}</span></p>
                <p>Total Value: <span className="font-medium">{order.price * order.quantity} Rs</span></p>
                <p>Message: <span className="font-medium">{order.message || "No message"}</span></p>

                <p className="text-sm text-gray-200 mt-2">
                  Created on: {formatDate(order.createdAt)}
                </p>
              </div>

              <Link
                to={`/supplier/order/${order._id}`}
                className="mt-4 inline-block bg-white text-indigo-600 p-3 rounded-lg shadow-md hover:bg-indigo-600 hover:text-white transition"
              >
                <span className="font-semibold">View Order Details</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierOrders;
