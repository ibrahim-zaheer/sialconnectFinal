// // components/AdminUserStats.jsx

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import UserCount from "./UserCount";
// import UserRolePieChart from "./UserRolePieChart";
// import UserCityBarChart from "./UserCityBarChart";

// const AdminUserStats = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAllUsers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("/api/admin/users", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const nonAdminUsers = res.data.filter((u) => u.role !== "admin");
//         setUsers(nonAdminUsers);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllUsers();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//       <UserCount users={users} loading={loading} />
//       <UserRolePieChart users={users} loading={loading} />
//       <div className="md:col-span-2">
//         <UserCityBarChart users={users} loading={loading} />
//       </div>
//     </div>
//   );
// };

// export default AdminUserStats;

// AdminUserStats.jsx
// AdminUserStats.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import UserCount from "./UserCount";
// import UserRolePieChart from "./UserRolePieChart";
// import UserCityBarChart from "./UserCityBarChart";

// const AdminUserStats = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAllUsers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("/api/admin/users", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const nonAdminUsers = res.data.filter((u) => u.role !== "admin");
//         setUsers(nonAdminUsers);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllUsers();
//   }, []);

//   return (
//     <div className="space-y-8">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h2 className="text-2xl font-semibold text-neutral-800">
//             User Analytics
//           </h2>
//           <p className="text-neutral-500">
//             Overview of platform users and their distribution
//           </p>
//         </div>
//         <div className="flex items-center space-x-2 text-sm">
//           <span className="flex items-center">
//             <span className="w-3 h-3 rounded-full bg-primary-500 mr-2"></span>
//             <span>Exporters</span>
//           </span>
//           <span className="flex items-center">
//             <span className="w-3 h-3 rounded-full bg-secondary-500 mr-2"></span>
//             <span>Suppliers</span>
//           </span>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* User Count Card */}
//         <div className="bg-surface rounded-xl p-6 shadow-xs border border-neutral-200 hover:shadow-sm transition-shadow">
//           <h3 className="text-lg font-medium text-neutral-700 mb-4">
//             User Overview
//           </h3>
//           <UserCount users={users} loading={loading} />
//         </div>

//         {/* Pie Chart Card */}
//         <div className="bg-surface rounded-xl p-6 shadow-xs border border-neutral-200 hover:shadow-sm transition-shadow lg:col-span-2">
//           <h3 className="text-lg font-medium text-neutral-700 mb-4">
//             User Roles Distribution
//           </h3>
//           <div className="h-[300px]">
//             <UserRolePieChart users={users} loading={loading} />
//           </div>
//         </div>
//       </div>

//       {/* Bar Chart Section */}
//       <div className="bg-surface rounded-xl p-6 shadow-xs border border-neutral-200 hover:shadow-sm transition-shadow w-1/2">
//         <h3 className="text-lg font-medium text-neutral-700 mb-4">
//           Geographical Distribution
//         </h3>
//         <div className="h-[400px]">
//           <UserCityBarChart users={users} loading={loading} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminUserStats;

// ======================================
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCount from "./UserCount";
import UserRolePieChart from "./UserRolePieChart";
import UserCityBarChart from "./UserCityBarChart";
import OrderLineChart from "./OrderLineChart";
import CategoryPieChart from "./CategoryPieChart";

const AdminUserStats = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Fetch Users
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const nonAdminUsers = res.data.filter((u) => u.role !== "admin");
        setUsers(nonAdminUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchAllUsers();
  }, []);

  // Fetch Orders
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/order/orders/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const orders = res.data.orders;
        setOrders(orders);

        // Group orders by category
        const groupedByCategory = orders.reduce((acc, order) => {
          const category = order.productId.category;
          if (category) {
            if (!acc[category]) {
              acc[category] = 0;
            }
            acc[category] += 1;
          }
          return acc;
        }, {});

        const categoryArray = Object.keys(groupedByCategory).map(
          (category) => ({
            category,
            count: groupedByCategory[category],
          })
        );

        setCategoryData(categoryArray);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchAllOrders();
  }, []);

  const loading = loadingUsers || loadingOrders;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-800">
            Admin Analytics
          </h2>
          <p className="text-neutral-500">
            Overview of platform users and orders
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-primary-500 mr-2"></span>
            <span>Exporters</span>
          </span>
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-secondary-500 mr-2"></span>
            <span>Suppliers</span>
          </span>
        </div>
      </div>

      {/* User Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface rounded-xl p-6 shadow-xs border border-neutral-200 hover:shadow-sm transition-shadow">
          <h3 className="text-lg font-medium text-neutral-700 mb-4">
            User Overview
          </h3>
          <UserCount users={users} loading={loadingUsers} />
        </div>

        <div className="bg-surface rounded-xl p-6 shadow-xs border border-neutral-200 hover:shadow-sm transition-shadow lg:col-span-2">
          <h3 className="text-lg font-medium text-neutral-700 mb-4">
            User Roles Distribution
          </h3>
          <div className="h-[300px]">
            <UserRolePieChart users={users} loading={loadingUsers} />
          </div>
        </div>
      </div>

      {/* User Geography */}
      <div className="w-full flex gap-6">
        <div className="bg-surface rounded-xl p-6 shadow-xs border border-neutral-200 hover:shadow-sm transition-shadow flex-1">
          <h3 className="text-lg font-medium text-neutral-700 mb-4">
            Geographical Distribution
          </h3>
          <div className="h-[400px]">
            <UserCityBarChart users={users} loading={loadingUsers} />
          </div>
        </div>

        {/* Order Stats */}
        <div className="bg-surface rounded-xl p-6 shadow-xs border border-neutral-200 hover:shadow-sm transition-shadow flex-1">
          <h3 className="text-lg font-medium text-neutral-700 mb-4">
            Orders Overview
          </h3>
          <p className="text-neutral-500 mb-2">
            View the orders in a line chart by month
          </p>
          <OrderLineChart orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default AdminUserStats;
