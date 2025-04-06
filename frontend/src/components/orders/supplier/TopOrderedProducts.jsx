// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../../redux/reducers/userSlice";

// const TopOrderedProducts = () => {
//   const user = useSelector(selectUser);
//   const token = user?.id ? localStorage.getItem("token") : null;

//   const [productRankings, setProductRankings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!token) {
//         setError("User not authenticated.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get("/api/order/orders/supplier", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const orders = response.data.orders;

//         const productCountMap = {};

//         // Count how many times each product appears
//         orders.forEach((order) => {
//           const productName = order.productId?.name || "Unknown";

//           if (productCountMap[productName]) {
//             productCountMap[productName]++;
//           } else {
//             productCountMap[productName] = 1;
//           }
//         });

//         // Convert to array and sort
//         const sortedProducts = Object.entries(productCountMap)
//           .map(([name, count]) => ({ name, count }))
//           .sort((a, b) => b.count - a.count);

//         setProductRankings(sortedProducts);
//       } catch (err) {
//         setError("Failed to fetch orders.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [token]);

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
    <div className="mt-6 bg-white shadow-md rounded-lg p-5">
      <h3 className="text-xl font-semibold text-center mb-4">
        Top Ordered Products
      </h3>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : productRankings.length === 0 ? (
        <p className="text-center text-gray-500">No product orders found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {productRankings.map((product, index) => (
            <li key={index} className="py-2 px-4 flex justify-between">
              <span className="font-medium">
                #{index + 1} - {product.name}
              </span>
              <span className="text-blue-600 font-semibold">{product.count} Orders</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopOrderedProducts;
