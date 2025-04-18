// import React, { useEffect, useState } from "react";
// import axios from "axios"; // Adjust path if needed
// import TokenPaymentForm from "../../payments/TokenPaymentForm";
// import PaymentPage from "../../../pages/payments/PaymentPage";
// import { Link } from "react-router-dom";

// const ExporterOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   const [activePaymentOrder, setActivePaymentOrder] = useState(null);


//   // useEffect(() => {
//   //   const fetchExporterOrders = async () => {
//   //     try {
//   //       const token = localStorage.getItem("token");
//   //       const response = await axios.get("/api/order/orders/exporter", {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       });

//   //       setOrders(response.data.orders);
//   //       setLoading(false);
//   //     } catch (error) {
//   //       setMessage(error.response?.data?.message || "Failed to fetch orders");
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchExporterOrders();
//   // }, []);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };
  
//   // ✅ Move it outside useEffect so it can be passed to children
//   const fetchExporterOrders = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("/api/order/orders/exporter", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setOrders(response.data.orders);
//       setLoading(false);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to fetch orders");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExporterOrders(); // ✅ now works fine here too
//   }, []);

//   if (loading) return <p className="text-center mt-5">Loading orders...</p>;
//   if (message) return <p className="text-center text-red-500 mt-5">{message}</p>;

//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold text-center mb-6">Your Orders</h2>
//       {orders.length === 0 ? (
//         <p className="text-center">No orders found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {orders.map((order) => (
//             <div key={order._id} className="border p-4 rounded shadow bg-white">
//               <h3 className="font-semibold text-lg">{order.auctionId?.title || "Auction"}</h3>
//               <p>Product: {order.productId?.name}</p>
//               <p>Supplier: {order.supplierId?.name}</p>
//               <p>Email: {order.supplierId?.email}</p>
//               <p>Quantity: {order.quantity}</p>
//               <p>Total Price: Rs {order.totalPrice}</p>
//               <p className="text-sm text-gray-500">Ordered On: {new Date(order.createdAt).toLocaleString()}</p>

//                 <Link
//                 to={`/exporter/order/${order._id}`}
//                 key={order._id}
//                 className="block bg-white p-4 shadow rounded-lg hover:shadow-md transition"
//               >
//                 <h3 className="text-lg font-semibold mb-2">
//                   {order.productId
//                     ? `Product: ${order.productId.name}`
//                     : order.auctionId
//                     ? `Auction: ${order.auctionId.title || "Untitled Auction"}`
//                     : "Unknown Product/Auction"}
//                 </h3>
              
//                 <p>Exporter: {order.exporterId?.name || "Unknown"}</p>
//                 <p>Price: {order.price} Rs</p>
//                 <p>Quantity: {order.quantity}</p>
//                 <p>Total Value: {order.price * order.quantity}</p>
//                 <p>Message: {order.message || "No message"}</p>
              
//                 <p className="text-sm text-gray-600 mt-2">
//                   Created on: {formatDate(order.createdAt)}
//                 </p>
//               </Link>
              
//               {order.sampleStatus === "waiting_for_payment" && (
//       <>
//         <button
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           onClick={() => setActivePaymentOrder(order._id)}
//         >
//           Send Token Payment
//         </button>
//         {activePaymentOrder === order._id && (
//           <div className="mt-4">
          
//             <PaymentPage orderId={order._id} tokenAmount={order.price * 100} onPaymentSuccess={() => {
//   fetchExporterOrders();
//   setActivePaymentOrder(null); // ✅ hide form again
// }}/>
//           </div>
//         )}
//       </>
//     )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExporterOrders;


// import React, { useEffect, useState } from "react";
// import axios from "axios"; // Adjust path if needed
// import TokenPaymentForm from "../../payments/TokenPaymentForm";
// import PaymentPage from "../../../pages/payments/PaymentPage";
// import { Link } from "react-router-dom";

// const ExporterOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

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
//       setLoading(false);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to fetch orders");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExporterOrders(); 
//   }, []);

//   if (loading) return <p className="text-center mt-5">Loading orders...</p>;
//   if (message) return <p className="text-center text-red-500 mt-5">{message}</p>;

//   return (
//     <div className="p-8">
//       <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Your Orders</h2>
//       {orders.length === 0 ? (
//         <p className="text-center text-gray-500">No orders found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {orders.map((order) => (
//             <div key={order._id} className="bg-white p-6 rounded-lg shadow-xl transform transition-all hover:scale-105 duration-300 ease-in-out">
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
              

              
//               <div className="space-y-3 text-gray-700">
              

//                 <p> {order.productId
//                   ? `Product: ${order.productId?.name}`
//                   : order.auctionId
//                   ? `Auction: ${order.auctionId?.title || "Untitled Auction"}`
//                   : "Unknown Product/Auction"}</p>
                

//                 <p><strong>Supplier:</strong> {order.supplierId?.name || "Unknown Supplier"}</p>
//                 <p><strong>Email:</strong> {order.supplierId?.email || "N/A"}</p>
//                 <p><strong>Quantity:</strong> {order.quantity}</p>
//                 <p><strong>Total Price:</strong> Rs {order.totalPrice}</p>
//                 <p>Status: {order.status}</p>
//                 <p>Payment:{order.paymentStatus}</p>


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
import FilterOrders from "../../FilterOrders";  // Import the FilterOrders component

const ExporterOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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

  const fetchExporterOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/order/orders/exporter", {
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
    fetchExporterOrders();
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
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Your Orders</h2>

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
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-lg shadow-xl transform transition-all hover:scale-105 duration-300 ease-in-out"
            >
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

              <div className="space-y-3 text-gray-700">
                <p><strong>Product:</strong> {order.productId?.name || "Unknown Product"}</p>
                <p><strong>Supplier:</strong> {order.supplierId?.name || "Unknown Supplier"}</p>
                <p><strong>Email:</strong> {order.supplierId?.email || "N/A"}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Total Price:</strong> Rs {order.totalPrice}</p>
                <p>Status: {order.status}</p>
                <p>Payment: {order.paymentStatus}</p>

                <p className="text-sm text-gray-500">Ordered On: {formatDate(order.createdAt)}</p>
              </div>

              <Link
                to={`/exporter/order/${order._id}`}
                className="block mt-4 p-4 bg-gray-100 rounded-lg hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold mb-2 text-indigo-600">
                  View Order Details
                </h3>
                <p className="text-sm text-gray-600">Click to see more details</p>
              </Link>

              {order.sampleStatus === "waiting_for_payment" && (
                <div className="mt-6">
                  <button
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => setActivePaymentOrder(order._id)}
                  >
                    Send Token Payment
                  </button>

                  {activePaymentOrder === order._id && (
                    <div className="mt-6">
                      <PaymentPage
                        orderId={order._id}
                        tokenAmount={order.price * 100}
                        onPaymentSuccess={() => {
                          fetchExporterOrders();
                          setActivePaymentOrder(null); // Hide form again
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExporterOrders;
