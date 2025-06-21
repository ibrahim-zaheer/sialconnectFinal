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
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCount from "./UserCount";
import UserRolePieChart from "./UserRolePieChart";
import UserCityBarChart from "./UserCityBarChart";

const AdminUserStats = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-800">User Analytics</h2>
          <p className="text-neutral-500">Overview of platform users and their distribution</p>
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Count Card */}
        <div className="bg-surface rounded-xl p-6 shadow-xs border border-neutral-200 hover:shadow-sm transition-shadow">
          <h3 className="text-lg font-medium text-neutral-700 mb-4">User Overview</h3>
          <UserCount users={users} loading={loading} />
        </div>

        {/* Pie Chart Card */}
        <div className="bg-surface rounded-xl p-6 shadow-xs border border-neutral-200 hover:shadow-sm transition-shadow lg:col-span-2">
          <h3 className="text-lg font-medium text-neutral-700 mb-4">User Roles Distribution</h3>
          <div className="h-[300px]">
            <UserRolePieChart users={users} loading={loading} />
          </div>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-surface rounded-xl p-6 shadow-xs border border-neutral-200 hover:shadow-sm transition-shadow">
        <h3 className="text-lg font-medium text-neutral-700 mb-4">Geographical Distribution</h3>
        <div className="h-[400px]">
          <UserCityBarChart users={users} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default AdminUserStats;