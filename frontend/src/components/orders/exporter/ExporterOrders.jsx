

// import React, { useEffect, useState } from "react";
// import axios from "axios"; 
// import TokenPaymentForm from "../../payments/TokenPaymentForm";
// import PaymentPage from "../../../pages/payments/PaymentPage";
// import { Link } from "react-router-dom";
// import FilterOrders from "../../FilterOrders";  // Import the FilterOrders component

// const ExporterOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   const [filterCriteria, setFilterCriteria] = useState({
//     sampleStatus: "",
//     paymentStatus: "",
//   });

//   const [activePaymentOrder, setActivePaymentOrder] = useState(null);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const fetchExporterOrders = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("/api/order/orders/exporter", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setOrders(response.data.orders);
//       setFilteredOrders(response.data.orders);  // Set initial filtered orders
//       setLoading(false);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to fetch orders");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExporterOrders();
//   }, []);

//   useEffect(() => {
//     // Apply filters whenever filter criteria changes
//     const filtered = orders.filter((order) => {
//       const matchesSampleStatus =
//         filterCriteria.sampleStatus === "" || order.sampleStatus === filterCriteria.sampleStatus;
//       const matchesPaymentStatus =
//         filterCriteria.paymentStatus === "" || order.paymentStatus === filterCriteria.paymentStatus;

//       return matchesSampleStatus && matchesPaymentStatus;
//     });
//     setFilteredOrders(filtered);
//   }, [filterCriteria, orders]);

//   if (loading) return <p className="text-center mt-5">Loading orders...</p>;
//   if (message) return <p className="text-center text-red-500 mt-5">{message}</p>;

//   return (
//     <div className="p-8">
//       <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Your Orders</h2>

//       {/* Filter Section */}
//       {/* <FilterOrders
//         filterOptions={{
//           sampleStatuses: ["waiting_for_sample", "sent", "received", "sample_accepted", "sample_rejected"],
//           paymentStatuses: ["pending", "completed"],
//         }}
//         onFilterChange={(name, value) => {
//           setFilterCriteria((prev) => ({
//             ...prev,
//             [name]: value,
//           }));
//         }}
//       /> */}
//       <FilterOrders
//   filterOptions={{
//     sampleStatuses: ["waiting_for_sample", "sent", "received", "sample_accepted", "sample_rejected"],
//     paymentStatuses: ["pending", "completed"],
//   }}
//   onFilterChange={(newFilters) => setFilterCriteria(newFilters)}
// />

//       {filteredOrders.length === 0 ? (
//         <p className="text-center text-gray-500">No orders found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredOrders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white p-6 rounded-lg shadow-xl transform transition-all hover:scale-105 duration-300 ease-in-out"
//             >
//               <div className="flex justify-between mb-4">
//                 {order.paymentStatus === "completed" && (
//                   <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">Payment Paid</span>
//                 )}
//                 {order.paymentStatus === "pending" && (
//                   <span className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-full">Payment Pending</span>
//                 )}
//                 {order.sampleStatus === "sample_rejected" && (
//                   <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full">Order Rejected</span>
//                 )}
//                 {order.status === "completed" && (
//                   <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">Order Completed</span>
//                 )}
//                 {order.status === "terminated" && (
//                   <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full">Order Terminated</span>
//                 )}
//               </div>

//               <div className="space-y-3 text-gray-700">
//                 <p><strong>Product:</strong> {order.productId?.name || "Unknown Product"}</p>
//                 <p><strong>Supplier:</strong> {order.supplierId?.name || "Unknown Supplier"}</p>
//                 <p><strong>Email:</strong> {order.supplierId?.email || "N/A"}</p>
//                 <p><strong>Quantity:</strong> {order.quantity}</p>
//                 <p><strong>Total Price:</strong> Rs {order.price * order.quantity}</p>
//                 <p>Status: {order.status}</p>
//                 <p>Payment: {order.paymentStatus}</p>

//                 <p className="text-sm text-gray-500">Ordered On: {formatDate(order.createdAt)}</p>
//               </div>

//               <Link
//                 to={`/exporter/order/${order._id}`}
//                 className="block mt-4 p-4 bg-gray-100 rounded-lg hover:shadow-md transition"
//               >
//                 <h3 className="text-lg font-semibold mb-2 text-indigo-600">
//                   View Order Details
//                 </h3>
//                 <p className="text-sm text-gray-600">Click to see more details</p>
//               </Link>

//               {order.sampleStatus === "waiting_for_payment" && (
//                 <div className="mt-6">
//                   <button
//                     className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                     onClick={() => setActivePaymentOrder(order._id)}
//                   >
//                     Send Token Payment
//                   </button>

//                   {activePaymentOrder === order._id && (
//                     <div className="mt-6">
//                       <PaymentPage
//                         orderId={order._id}
//                         tokenAmount={order.price * 100}
//                         onPaymentSuccess={() => {
//                           fetchExporterOrders();
//                           setActivePaymentOrder(null); // Hide form again
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExporterOrders;

import React, { useEffect, useState } from "react";
import axios from "axios"; 
import TokenPaymentForm from "../../payments/TokenPaymentForm";
import PaymentPage from "../../../pages/payments/PaymentPage";
import { Link } from "react-router-dom";
import FilterOrders from "../../FilterOrders";
import { motion } from "framer-motion";

const ExporterOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filterCriteria, setFilterCriteria] = useState({
    sampleStatus: "",
    paymentStatus: "",
  });

  const [activePaymentOrder, setActivePaymentOrder] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

  const fetchExporterOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/order/orders/exporter", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data.orders);
      setFilteredOrders(response.data.orders);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExporterOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const matchesSample = !filterCriteria.sampleStatus || 
                          order.sampleStatus === filterCriteria.sampleStatus;
      const matchesPayment = !filterCriteria.paymentStatus || 
                           order.paymentStatus === filterCriteria.paymentStatus;
      return matchesSample && matchesPayment;
    });
    setFilteredOrders(filtered);
  }, [filterCriteria, orders]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-8 w-[80%] mx-auto"
    >
      <h2 className="text-2xl font-bold text-primary-800 mb-6">Your Orders</h2>

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
          {filteredOrders.map((order) => (
            <motion.div
              key={order._id}
              whileHover={{ y: -5 }}
              className="bg-surface rounded-xl shadow-sm border border-neutral-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-primary-800">
                    {order.productId?.name || "Unknown Product"}
                  </h3>
                  <div className="flex space-x-2">
                    {order.paymentStatus === "completed" && (
                      <span className={getStatusBadge("completed")}>Paid</span>
                    )}
                    {order.paymentStatus === "pending" && (
                      <span className={getStatusBadge("pending")}>Pending</span>
                    )}
                    {order.sampleStatus === "sample_rejected" && (
                      <span className={getStatusBadge("sample_rejected")}>Rejected</span>
                    )}
                    {order.status === "terminated" && (
                      <span className={getStatusBadge("terminated")}>Terminated</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 text-neutral-700">
                  <div className="flex justify-between">
                    <span>Supplier:</span>
                    <span className="font-medium">{order.supplierId?.name || "Unknown"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-medium">{order.supplierId?.email || "N/A"}</span>
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
                  <div className="text-sm text-neutral-500">
                    Ordered: {formatDate(order.createdAt)}
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/exporter/order/${order._id}`}
                    className="block text-center bg-primary-600 hover:bg-primary-700 text-surface px-4 py-2 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </div>

                {order.sampleStatus === "waiting_for_payment" && (
                  <div className="mt-4">
                    <button
                      className="w-full bg-accent-600 hover:bg-accent-700 text-surface px-4 py-2 rounded-lg transition-colors"
                      onClick={() => setActivePaymentOrder(order._id)}
                    >
                      Send Token Payment
                    </button>

                    {activePaymentOrder === order._id && (
                      <div className="mt-4">
                        <PaymentPage
                          orderId={order._id}
                          tokenAmount={order.price * 100}
                          onPaymentSuccess={() => {
                            fetchExporterOrders();
                            setActivePaymentOrder(null);
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ExporterOrders;