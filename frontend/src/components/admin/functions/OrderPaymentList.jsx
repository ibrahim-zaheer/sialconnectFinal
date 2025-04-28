// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function OrderPaymentList() {
//     const [orders, setOrders] = useState([]);
//     const [error, setError] = useState("");
  
//     // Fetch orders with payment details on component mount
//     useEffect(() => {
//       const fetchOrders = async () => {
//         try {
//           const token = localStorage.getItem("token");
//           const res = await axios.get("/api/admin/orders", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
          
  
//           setOrders(res.data.orders);
//         } catch (err) {
//           setError(err.response?.data?.message || "Failed to fetch orders");
//         }
//       };
  
//       fetchOrders();
//     }, []);
  
//     return (
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4">Orders with Payment Details</h2>
//         {error && <p className="text-red-600">{error}</p>}
  
//         {orders.length === 0 && !error ? (
//           <p>No orders found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white shadow-md rounded-xl">
//               <thead className="bg-gray-100 text-gray-700">
//                 <tr>
//                   <th className="py-2 px-4 text-left">Order ID</th>
//                   <th className="py-2 px-4 text-left">Exporter</th>
//                   <th className="py-2 px-4 text-left">Price</th>
//                   <th className="py-2 px-4 text-left">Quantity</th>
//                   <th className="py-2 px-4 text-left">Payment Method</th>
//                   <th className="py-2 px-4 text-left">Payment Status</th>
//                   <th className="py-2 px-4 text-left">Payment Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order) => (
//                   <tr key={order._id} className="border-b">
//                     <td className="py-2 px-4">{order._id}</td>
//                     <td className="py-2 px-4">{order.exporterId?.name}</td>
//                     <td className="py-2 px-4">${order.price}</td>
//                     <td className="py-2 px-4">{order.quantity}</td>
//                     <td className="py-2 px-4">{order.paymentDetails?.paymentMethod || "N/A"}</td>
//                     <td className="py-2 px-4">{order.paymentDetails?.paymentStatus || "N/A"}</td>
//                     <td className="py-2 px-4">${order.paymentDetails?.paymentAmount || "0.00"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     );
// }


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function OrderPaymentList() {
//     const [orders, setOrders] = useState([]);
//     const [filteredOrders, setFilteredOrders] = useState([]);
//     const [error, setError] = useState("");
  
//     // Fetch orders with payment details on component mount
//     useEffect(() => {
//       const fetchOrders = async () => {
//         try {
//           const token = localStorage.getItem("token");
//           const res = await axios.get("/api/admin/orders", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
          
//           setOrders(res.data.orders);
//           // Filter orders to only show those with pending payment status
//           // const pendingOrders = res.data.orders.filter(
//           //   order => order.paymentStatus?.toLowerCase() === "waiting_for_admin"
//           // );
//           const pendingOrders = res.data.orders.filter(
//             order => order.paymentDetails?.paymentStatus?.toLowerCase() === "detailsgiven"
//           );
//           setFilteredOrders(pendingOrders);
//         } catch (err) {
//           setError(err.response?.data?.message || "Failed to fetch orders");
//         }
//       };
  
//       fetchOrders();
//     }, []);
  
//     return (
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4">Pending Payment Orders</h2>
//         {error && <p className="text-red-600">{error}</p>}
  
//         {filteredOrders.length === 0 && !error ? (
//           <p>No pending payment orders found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white shadow-md rounded-xl">
//               <thead className="bg-gray-100 text-gray-700">
//                 <tr>
//                   <th className="py-2 px-4 text-left">Order ID</th>
//                   <th className="py-2 px-4 text-left">Exporter</th>
//                   <th className="py-2 px-4 text-left">Price</th>
//                   <th className="py-2 px-4 text-left">Quantity</th>
//                   <th className="py-2 px-4 text-left">Payment Method</th>
//                   <th className="py-2 px-4 text-left">Payment Status</th>
//                   <th className="py-2 px-4 text-left">Payment Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredOrders.map((order) => (
//                   <tr key={order._id} className="border-b">
//                     <td className="py-2 px-4">{order._id}</td>
//                     <td className="py-2 px-4">{order.exporterId?.name}</td>
//                     <td className="py-2 px-4">${order.price}</td>
//                     <td className="py-2 px-4">{order.quantity}</td>
//                     <td className="py-2 px-4">{order.paymentDetails?.paymentMethod || "N/A"}</td>
//                     <td className="py-2 px-4">{order.paymentDetails?.paymentStatus || "N/A"}</td>
//                     <td className="py-2 px-4">${order.paymentDetails?.paymentAmount || "0.00"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     );
// }

// OrderPaymentList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderDetailsModal from "./components/OrderDetailsModal";


export default function OrderPaymentList() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
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
  //         order => order.paymentDetails?.paymentStatus?.toLowerCase() === "detailsgiven"
  //       );
  //       setFilteredOrders(pendingOrders);
  //     } catch (err) {
  //       setError(err.response?.data?.message || "Failed to fetch orders");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

   // Extract fetchOrders to make it reusable
   const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setOrders(res.data.orders);
      const pendingOrders = res.data.orders.filter(
        order => order.paymentDetails?.paymentStatus?.toLowerCase() === "detailsgiven"
      );
      setFilteredOrders(pendingOrders);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-200">
        <h2 className="text-xl font-semibold text-neutral-800">Pending Payment Orders</h2>
        <p className="text-sm text-neutral-500 mt-1">Orders awaiting payment confirmation</p>
      </div>
      
      <div className="p-6">
        {error && (
          <div className="mb-4 p-4 bg-error-50 text-error-700 rounded-lg">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-neutral-500">No pending payment orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Exporter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Payment Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredOrders.map((order) => (
                  <tr 
                    key={order._id} 
                    className="hover:bg-neutral-50 transition-colors cursor-pointer"
                    onClick={() => handleOrderClick(order)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600 hover:underline">
                      {order._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{order.exporterId?.name || '—'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">Rs {order.price?.toFixed(2) || '0.00'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{order.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      <span className="capitalize">
                        {order.paymentDetails?.paymentMethod?.replace(/_/g, ' ') || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.paymentDetails?.paymentStatus === 'detailsgiven' 
                          ? 'bg-warning-100 text-warning-800' 
                          : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {order.paymentDetails?.paymentStatus?.replace(/_/g, ' ') || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      ${order.paymentDetails?.paymentAmount?.toFixed(2) || '0.00'}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          closeModal={closeModal} 
          fetchOrderDetails={fetchOrders}
        />
      )}
    </div>
  );
}