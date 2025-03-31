// components/AdminUserStats.jsx

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <UserCount users={users} loading={loading} />
      <UserRolePieChart users={users} loading={loading} />
      <div className="md:col-span-2">
        <UserCityBarChart users={users} loading={loading} />
      </div>
    </div>
  );
};

export default AdminUserStats;
