import React, { useEffect, useState } from "react";
import axios from "axios";
import UserFilters from "./UserFilters";
import RoleFilter from "./RoleFilter";

const calculateAge = (dob) => {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const ageRanges = [
  {}, // All Ages
  { min: 18, max: 25 },
  { min: 26, max: 35 },
  { min: 36, max: 45 },
  { min: 46, max: 100 },
];

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [ageRangeIndex, setAgeRangeIndex] = useState(0);
  const [role, setRole] = useState(""); // role filter

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.filter((u) => u.role !== "admin"));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchMatch =
      (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(search.toLowerCase()));

    const cityMatch = city === "" || user.city === city;

    const userAge = user.dateOfBirth ? calculateAge(user.dateOfBirth) : null;
    const { min, max } = ageRanges[ageRangeIndex];
    const ageMatch = !userAge || !min ? true : userAge >= min && userAge <= max;
    const roleMatch = role === "" || user.role === role;
    return searchMatch && cityMatch && ageMatch && roleMatch;
  });

  const suspendUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `/api/admin/suspend/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);

      // Refresh the user list after suspension
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === userId ? { ...u, status: "suspended" } : u
        )
      );
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const reactivateUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `/api/admin/reactivate/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(res.data.message);

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === userId ? { ...u, status: "active" } : u
        )
      );
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `/api/admin/toggle-status/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);

      // Update status in local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: res.data.user.status } : user
        )
      );
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const uniqueCities = [...new Set(users.map((u) => u.city).filter(Boolean))];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Registered Users</h2>
      <UserFilters
        search={search}
        city={city}
        ageRange={ageRangeIndex}
        onSearch={setSearch}
        onCityChange={setCity}
        onAgeChange={(index) => setAgeRangeIndex(Number(index))}
        cityOptions={uniqueCities}
      />
      <RoleFilter selectedRole={role} onRoleChange={setRole} />

      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Role</th>
            <th className="py-3 px-4 text-left">City</th>
            <th className="py-3 px-4 text-left">Business Name</th>
            <th className="py-3 px-4 text-left">Business Address</th>
            <th className="py-3 px-4 text-left">Date of Birth</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="border-b">
              {/* <td className="py-2 px-4">{user.name}</td> */}
              <td className="py-2 px-4">
                {user.role === "supplier" || user.role === "exporter" ? (
                  <a
                    href={`/admin/user/${user.role}/${user._id}`}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {user.name}
                  </a>
                ) : (
                  user.name
                )}
              </td>

              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4">{user.city || "—"}</td>
              <td className="py-2 px-4">{user.businessName || "—"}</td>
              <td className="py-2 px-4">{user.businessAddress || "—"}</td>
              <td className="py-2 px-4">
                {user.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString()
                  : "—"}
              </td>
              <td className="py-2 px-4">
                <span
                  className={`badge ${
                    user.status === "suspended"
                      ? "badge-error"
                      : "badge-success"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => toggleUserStatus(user._id)}
                  className={`btn btn-sm ${
                    user.status === "active" ? "btn-warning" : "btn-success"
                  }`}
                >
                  {user.status === "active" ? "Suspend" : "Reactivate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
