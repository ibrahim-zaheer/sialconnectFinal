// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../../redux/reducers/userSlice";

// const SupplierOrderCount = () => {
//   const user = useSelector(selectUser);
//   const token = user?.id ? localStorage.getItem("token") : null;

//   const [orderCount, setOrderCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrderCount = async () => {
//       if (!token) return;

//       try {
//         const response = await axios.get("/api/order/orders/supplier", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setOrderCount(response.data.orders?.length || 0);
//       } catch (error) {
//         console.error("Failed to fetch orders", error);
//         setOrderCount(0);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderCount();
//   }, [token]);

//   return (
//     <div className="text-center mt-6">
//       {loading ? (
//         <p className="text-gray-500">Loading order count...</p>
//       ) : (
//         <p className="text-lg font-semibold">
//           Total Orders: <span className="text-blue-600">{orderCount}</span>
//         </p>
//       )}
//     </div>
//   );
// };

// export default SupplierOrderCount;

import React from "react";
import useOrders from "../hook/useOrders";
import EstimatedOrderValue from "./EstimatedOrderValue";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const SupplierOrderCount = () => {
  const { orders, loading } = useOrders();
  const user = useSelector((state) => state.user);

  return (
    <motion.div 
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      className="bg-surface rounded-xl shadow-sm p-6 border border-neutral-100"
    >
      <h3 className="text-xl font-semibold text-primary-800 mb-4">Order Summary</h3>
      
      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-6 bg-neutral-100 rounded"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-lg text-neutral-700">
            Total Orders: <span className="font-bold text-primary-600">{orders.length}</span>
          </p>
          
          {user?.role === "supplier" && (
            <EstimatedOrderValue orders={orders} />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SupplierOrderCount;