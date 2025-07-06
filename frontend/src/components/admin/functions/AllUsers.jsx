// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import UserFilters from "./UserFilters";
// import RoleFilter from "./RoleFilter";

// const calculateAge = (dob) => {
//   const birth = new Date(dob);
//   const today = new Date();
//   let age = today.getFullYear() - birth.getFullYear();
//   const m = today.getMonth() - birth.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
//   return age;
// };

// const ageRanges = [
//   {}, // All Ages
//   { min: 18, max: 25 },
//   { min: 26, max: 35 },
//   { min: 36, max: 45 },
//   { min: 46, max: 100 },
// ];

// const AllUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [city, setCity] = useState("");
//   const [ageRangeIndex, setAgeRangeIndex] = useState(0);
//   const [role, setRole] = useState(""); // role filter

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("/api/admin/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(res.data.filter((u) => u.role !== "admin"));
//       } catch (error) {
//         console.error("Failed to fetch users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const filteredUsers = users.filter((user) => {
//     const searchMatch =
//       (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
//       (user.email && user.email.toLowerCase().includes(search.toLowerCase()));

//     const cityMatch = city === "" || user.city === city;

//     const userAge = user.dateOfBirth ? calculateAge(user.dateOfBirth) : null;
//     const { min, max } = ageRanges[ageRangeIndex];
//     const ageMatch = !userAge || !min ? true : userAge >= min && userAge <= max;
//     const roleMatch = role === "" || user.role === role;
//     return searchMatch && cityMatch && ageMatch && roleMatch;
//   });

//   const suspendUser = async (userId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.put(
//         `/api/admin/suspend/${userId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert(res.data.message);

//       // Refresh the user list after suspension
//       setUsers((prevUsers) =>
//         prevUsers.map((u) =>
//           u._id === userId ? { ...u, status: "suspended" } : u
//         )
//       );
//     } catch (error) {
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   const reactivateUser = async (userId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.put(
//         `/api/admin/reactivate/${userId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert(res.data.message);

//       setUsers((prevUsers) =>
//         prevUsers.map((u) =>
//           u._id === userId ? { ...u, status: "active" } : u
//         )
//       );
//     } catch (error) {
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   const toggleUserStatus = async (userId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.put(
//         `/api/admin/toggle-status/${userId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert(res.data.message);

//       // Update status in local state
//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user._id === userId ? { ...user, status: res.data.user.status } : user
//         )
//       );
//     } catch (error) {
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   const uniqueCities = [...new Set(users.map((u) => u.city).filter(Boolean))];

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">All Registered Users</h2>
//       <UserFilters
//         search={search}
//         city={city}
//         ageRange={ageRangeIndex}
//         onSearch={setSearch}
//         onCityChange={setCity}
//         onAgeChange={(index) => setAgeRangeIndex(Number(index))}
//         cityOptions={uniqueCities}
//       />
//       <RoleFilter selectedRole={role} onRoleChange={setRole} />

//       <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
//         <thead className="bg-gray-100 text-gray-700">
//           <tr>
//             <th className="py-3 px-4 text-left">Name</th>
//             <th className="py-3 px-4 text-left">Email</th>
//             <th className="py-3 px-4 text-left">Role</th>
//             <th className="py-3 px-4 text-left">City</th>
//             <th className="py-3 px-4 text-left">Business Name</th>
//             <th className="py-3 px-4 text-left">Business Address</th>
//             <th className="py-3 px-4 text-left">Date of Birth</th>
//             <th className="py-3 px-4 text-left">Status</th>
//             <th className="py-3 px-4 text-left">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.map((user) => (
//             <tr key={user._id} className="border-b">
//               {/* <td className="py-2 px-4">{user.name}</td> */}
//               <td className="py-2 px-4">
//                 {user.role === "supplier" || user.role === "exporter" ? (
//                   <a
//                     href={`/admin/user/${user.role}/${user._id}`}
//                     className="text-blue-600 hover:underline font-semibold"
//                   >
//                     {user.name}
//                   </a>
//                 ) : (
//                   user.name
//                 )}
//               </td>

//               <td className="py-2 px-4">{user.email}</td>
//               <td className="py-2 px-4">{user.role}</td>
//               <td className="py-2 px-4">{user.city || "—"}</td>
//               <td className="py-2 px-4">{user.businessName || "—"}</td>
//               <td className="py-2 px-4">{user.businessAddress || "—"}</td>
//               <td className="py-2 px-4">
//                 {user.dateOfBirth
//                   ? new Date(user.dateOfBirth).toLocaleDateString()
//                   : "—"}
//               </td>
//               <td className="py-2 px-4">
//                 <span
//                   className={`badge ${
//                     user.status === "suspended"
//                       ? "badge-error"
//                       : "badge-success"
//                   }`}
//                 >
//                   {user.status}
//                 </span>
//               </td>
//               <td className="py-2 px-4">
//                 <button
//                   onClick={() => toggleUserStatus(user._id)}
//                   className={`btn btn-sm ${
//                     user.status === "active" ? "btn-warning" : "btn-success"
//                   }`}
//                 >
//                   {user.status === "active" ? "Suspend" : "Reactivate"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllUsers;

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
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
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
    <div className="p-6 bg-neutral-50 min-h-screen pt-24">
      <div className="max-w-8xl px-6 mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">
            User Management
          </h2>
          <p className="text-neutral-600">
            View and manage all registered users
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                City
              </label>
              <select
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">All Cities</option>
                {uniqueCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Age Range
              </label>
              <select
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={ageRangeIndex}
                onChange={(e) => setAgeRangeIndex(Number(e.target.value))}
              >
                <option value={0}>All Ages</option>
                <option value={1}>18-25</option>
                <option value={2}>26-35</option>
                <option value={3}>36-45</option>
                <option value={4}>46+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Role
              </label>
              <select
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="supplier">Supplier</option>
                <option value="exporter">Exporter</option>
                <option value="buyer">Buyer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Business
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      DOB
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-neutral-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.role === "supplier" ||
                          user.role === "exporter" ? (
                            <a
                              href={`/admin/user/${user.role}/${user._id}`}
                              className="text-primary-600 hover:text-primary-800 font-medium hover:underline"
                            >
                              {user.name}
                            </a>
                          ) : (
                            <span className="text-neutral-900">
                              {user.name}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-neutral-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                            style={{
                              backgroundColor:
                                user.role === "supplier"
                                  ? "#ECFDF5"
                                  : user.role === "exporter"
                                  ? "#EEF2FF"
                                  : "#EFF6FF",
                              color:
                                user.role === "supplier"
                                  ? "#065F46"
                                  : user.role === "exporter"
                                  ? "#3730A3"
                                  : "#1E40AF",
                            }}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-neutral-900">
                          {user.city || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-neutral-900">
                          {user.businessName || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-neutral-900">
                          {user.dateOfBirth
                            ? new Date(user.dateOfBirth).toLocaleDateString()
                            : "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === "suspended"
                                ? "bg-error-100 text-error-800"
                                : "bg-success-100 text-success-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleUserStatus(user._id)}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              user.status === "active"
                                ? "bg-warning-100 text-warning-800 hover:bg-warning-200"
                                : "bg-success-100 text-success-800 hover:bg-success-200"
                            } transition-colors`}
                          >
                            {user.status === "active"
                              ? "Suspend"
                              : "Reactivate"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-4 text-center text-neutral-500"
                      >
                        No users found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
