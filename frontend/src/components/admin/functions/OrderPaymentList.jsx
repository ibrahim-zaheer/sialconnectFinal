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


import React, { useState, useEffect } from "react";
import axios from "axios";

export default function OrderPaymentList() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [error, setError] = useState("");
  
    // Fetch orders with payment details on component mount
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get("/api/admin/orders", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          setOrders(res.data.orders);
          // Filter orders to only show those with pending payment status
          // const pendingOrders = res.data.orders.filter(
          //   order => order.paymentStatus?.toLowerCase() === "waiting_for_admin"
          // );
          const pendingOrders = res.data.orders.filter(
            order => order.paymentDetails?.paymentStatus?.toLowerCase() === "detailsgiven"
          );
          setFilteredOrders(pendingOrders);
        } catch (err) {
          setError(err.response?.data?.message || "Failed to fetch orders");
        }
      };
  
      fetchOrders();
    }, []);
  
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Pending Payment Orders</h2>
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
                  <tr key={order._id} className="border-b">
                    <td className="py-2 px-4">{order._id}</td>
                    <td className="py-2 px-4">{order.exporterId?.name}</td>
                    <td className="py-2 px-4">${order.price}</td>
                    <td className="py-2 px-4">{order.quantity}</td>
                    <td className="py-2 px-4">{order.paymentDetails?.paymentMethod || "N/A"}</td>
                    <td className="py-2 px-4">{order.paymentDetails?.paymentStatus || "N/A"}</td>
                    <td className="py-2 px-4">${order.paymentDetails?.paymentAmount || "0.00"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
}