


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

const TopOrderedProducts = () => {
  const { orders, loading, error } = useOrders();

  // Memoize rankings to avoid recomputation on every render
  const productRankings = useMemo(() => {
    const map = {};

    orders.forEach((order) => {
      const productName = order.productId?.name || "Unknown";
      map[productName] = (map[productName] || 0) + 1;
    });

    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [orders]);

  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg rounded-lg">
      <h3 className="text-3xl font-semibold text-center mb-6">Top Ordered Products</h3>

      {loading ? (
        <p className="text-center text-lg text-gray-200">Loading...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-400">{error}</p>
      ) : productRankings.length === 0 ? (
        <p className="text-center text-lg text-gray-200">No product orders found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {productRankings.map((product, index) => (
            <li
              key={index}
              className="py-4 px-6 flex justify-between items-center bg-white text-gray-800 rounded-lg shadow-md mb-4 hover:bg-gray-50 transition"
            >
              <span className="font-semibold text-xl">
                #{index + 1} - {product.name}
              </span>
              <span className="text-blue-600 font-semibold text-lg">
                {product.count} Orders
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopOrderedProducts;
