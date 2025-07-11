// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../../redux/reducers/userSlice";
// import useOrders from "../hook/useOrders";


// const HighestOrderValue = () => {
//   const user = useSelector(selectUser);
//   const token = user?.id ? localStorage.getItem("token") : null;
//   const { orders, loading, error } = useOrders();

//   // const [highestOrder, setHighestOrder] = useState(null);
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState("");
//   const highestOrder =
//   orders.length > 0
//     ? orders.reduce((max, order) =>
//         order.price * order.quantity > max.price * max.quantity ? order : max
//       , orders[0])
//     : null;
//     const formatDate = (dateString) =>
//       new Date(dateString).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });


//   return (
//     <div className="mt-6 bg-white shadow-md rounded-lg p-5">
//       <h3 className="text-xl font-semibold text-center mb-4">
//         Highest Valued Orders
//       </h3>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : !highestOrder ? (
//         <p className="text-center text-gray-500">No orders found.</p>
//       ) : (
//         <div className="text-center">
//           <p>
//             <span className="font-medium">Product:</span>{" "}
//             {highestOrder.productId?.name || "Unknown"}
//           </p>
//           <p>
//             <span className="font-medium">Exporter:</span>{" "}
//             {highestOrder.exporterId?.name || "Unknown"}
//           </p>
//           <p>
//             <span className="font-medium">Price:</span> {highestOrder.price} Rs
//           </p>
//           <p>
//             <span className="font-medium">Quantity:</span> {highestOrder.quantity}
//           </p>
//           <p>
//             <span className="font-medium">Total Value:</span>{" "}
//             <span className="text-green-600 font-semibold">
//               {highestOrder.price * highestOrder.quantity} Rs
//             </span>
//           </p>
//           <p className="text-sm text-gray-500 mt-1">
//             Created on: {formatDate(highestOrder.createdAt)}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HighestOrderValue;


// import React from "react";
// import useOrders from "../hook/useOrders";
// import { motion } from "framer-motion";

// const HighestOrderValue = () => {
//   const { orders, loading, error } = useOrders();

//   const highestOrder = orders.length > 0
//     ? orders.reduce((max, order) => 
//         order.price * order.quantity > max.price * max.quantity ? order : max, 
//         orders[0]
//       )
//     : null;

//   return (
//     <motion.div 
//       initial={{ y: 20 }}
//       animate={{ y: 0 }}
//       className="bg-gradient-to-r from-primary-600 to-primary-700 text-surface rounded-xl shadow-sm p-6 h-full"
//     >
//       <h3 className="text-xl font-semibold mb-4 text-center">Highest Value Order</h3>

//       {loading ? (
//         <div className="animate-pulse space-y-4">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="h-12 bg-primary-500/20 rounded-lg"></div>
//           ))}
//         </div>
//       ) : error ? (
//         <p className="text-error-100 text-center">{error}</p>
//       ) : !highestOrder ? (
//         <p className="text-neutral-200 text-center">No orders found</p>
//       ) : (
//         <div className="space-y-4">
//           <div className="bg-surface/10 p-4 rounded-lg backdrop-blur-sm">
//             <p className="text-neutral-200">Product</p>
//             <p className="font-bold text-white">
//               {highestOrder.productId?.name || "Unknown Product"}
//             </p>
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-surface/10 p-4 rounded-lg backdrop-blur-sm">
//               <p className="text-neutral-200">Price</p>
//               <p className="font-bold text-white">{highestOrder.price} Rs</p>
//             </div>
//             <div className="bg-surface/10 p-4 rounded-lg backdrop-blur-sm">
//               <p className="text-neutral-200">Quantity</p>
//               <p className="font-bold text-white">{highestOrder.quantity}</p>
//             </div>
//           </div>
          
//           <div className="bg-surface/10 p-4 rounded-lg backdrop-blur-sm">
//             <p className="text-neutral-200">Total Value</p>
//             <p className="font-bold text-accent-300">
//               {highestOrder.price * highestOrder.quantity} Rs
//             </p>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default HighestOrderValue;

import React from "react";
import useOrders from "../hook/useOrders";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const HighestOrderValue = () => {
  const { orders, loading, error } = useOrders();
  const { t } = useTranslation();

  // const highestOrder = orders.length > 0
  //   ? orders.reduce((max, order) => 
  //       order.price * order.quantity > max.price * max.quantity ? order : max, 
  //       orders[0]
  //     )
  //   : null;
    // Filter out orders where product is unknown
  const validOrders = orders.filter(
    (order) => order.productId?.name
  );

  const highestOrder = validOrders.length > 0
    ? validOrders.reduce((max, order) => 
        order.price * order.quantity > max.price * max.quantity ? order : max, 
        validOrders[0]
      )
    : null;

  return (
    <motion.div 
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-primary-600 to-primary-700 text-surface rounded-xl shadow-sm p-6 h-full"
    >
      <h3 className="text-xl font-semibold mb-4 text-center">{t('order:orderSummarys')}</h3>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-primary-500/20 rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        <p className="text-error-100 text-center">{error}</p>
      ) : !highestOrder ? (
        <p className="text-neutral-200 text-center">{t('order:noOrdersFound')}</p>
      ) : (
        <div className="space-y-4">
          <div className="bg-surface/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-neutral-200">{t('order:product')}</p>
            <p className="font-bold text-white">
              {highestOrder.productId?.name || t('order:unknownProduct')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface/10 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-neutral-200">{t('order:price')}</p>
              <p className="font-bold text-white">{highestOrder.price} Rs</p>
            </div>
            <div className="bg-surface/10 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-neutral-200">{t('order:quantity')}</p>
              <p className="font-bold text-white">{highestOrder.quantity}</p>
            </div>
          </div>
          
          <div className="bg-surface/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-neutral-200">{t('order:totalValue')}</p>
            <p className="font-bold text-accent-300">
              {highestOrder.price * highestOrder.quantity} Rs
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default HighestOrderValue;
