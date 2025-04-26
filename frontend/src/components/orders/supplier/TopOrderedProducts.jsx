


// import React, { useMemo } from "react";
// import useOrders from "../hook/useOrders";

// const TopOrderedProducts = () => {
//   const { orders, loading, error } = useOrders();

//   // Memoize rankings to avoid recomputation on every render
//   const productRankings = useMemo(() => {
//     const map = {};

//     orders.forEach((order) => {
//       const productName = order.productId?.name || "Unknown";
//       map[productName] = (map[productName] || 0) + 1;
//     });

//     return Object.entries(map)
//       .map(([name, count]) => ({ name, count }))
//       .sort((a, b) => b.count - a.count);
//   }, [orders]);

//   return (
//     <div className="mt-6 bg-white shadow-md rounded-lg p-5">
//       <h3 className="text-xl font-semibold text-center mb-4">
//         Top Ordered Products
//       </h3>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : productRankings.length === 0 ? (
//         <p className="text-center text-gray-500">No product orders found.</p>
//       ) : (
//         <ul className="divide-y divide-gray-200">
//           {productRankings.map((product, index) => (
//             <li key={index} className="py-2 px-4 flex justify-between">
//               <span className="font-medium">
//                 #{index + 1} - {product.name}
//               </span>
//               <span className="text-blue-600 font-semibold">{product.count} Orders</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TopOrderedProducts;



import React, { useMemo } from "react";
import useOrders from "../hook/useOrders";
import { motion } from "framer-motion";

const TopOrderedProducts = () => {
  const { orders, loading, error } = useOrders();

  const productRankings = useMemo(() => {
    const map = {};
    orders.forEach((order) => {
      const productName = order.productId?.name || "Unknown";
      map[productName] = (map[productName] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Show top 5 only
  }, [orders]);

  return (
    <motion.div 
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-surface rounded-xl shadow-sm p-6 h-full"
    >
      <h3 className="text-xl font-semibold mb-4 text-center">Top Ordered Products</h3>

      {loading ? (
        <div className="animate-pulse space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-secondary-500/20 rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        <p className="text-error-100 text-center">{error}</p>
      ) : productRankings.length === 0 ? (
        <p className="text-neutral-200 text-center">No products ordered yet</p>
      ) : (
        <ul className="space-y-3">
          {productRankings.map((product, index) => (
            <li 
              key={index}
              className="flex justify-between items-center bg-surface/10 p-3 rounded-lg backdrop-blur-sm hover:bg-surface/20 transition"
            >
              <span className="font-medium text-white">
                <span className="text-accent-300">#{index + 1}</span> {product.name}
              </span>
              <span className="bg-surface text-secondary-700 px-2 py-1 rounded-full text-sm font-bold">
                {product.count} {product.count === 1 ? 'order' : 'orders'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default TopOrderedProducts;