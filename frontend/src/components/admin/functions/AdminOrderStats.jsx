

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import OrderLineChart from "./OrderLineChart";

// export default function AdminOrderStats() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAllOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("/api/order/orders/all", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log(res.data);
//         setOrders(res.data); // Set all orders
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllOrders();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-gray-800">Admin Order Stats</h2>
//         <p className="text-gray-600">View the orders in a line chart by month</p>
//       </div>

//       <OrderLineChart orders={orders} /> {/* Pass orders to the LineChart component */}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderLineChart from "./OrderLineChart";  // Import the chart component
import CategoryPieChart from "./CategoryPieChart";
export default function AdminOrderStats() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/order/orders/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // setOrders(res.data.orders); // Set the orders from the response
            const orders = res.data.orders;
        setOrders(orders); // Set the orders from the response

        // Group orders by category
        const groupedByCategory = orders.reduce((acc, order) => {
          const category = order.productId.category; // Get category from productId
          if (category) {
            if (!acc[category]) {
              acc[category] = 0;
            }
            acc[category] += 1;
          }
          return acc;
        }, {});
         // Convert grouped data into an array for charting
        const categoryArray = Object.keys(groupedByCategory).map((category) => ({
          category,
          count: groupedByCategory[category],
        }));

        setCategoryData(categoryArray); 
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800">Admin Order Stats</h2>
      <p className="text-gray-600">View the orders in a line chart by month</p>
      <OrderLineChart orders={orders} /> {/* Pass orders to the LineChart component */}
       {/* <CategoryPieChart categoryData={categoryData} /> */}
    </div>
  );
}
