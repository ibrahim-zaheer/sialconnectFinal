// import React from 'react'
// import UserCount from './functions/UserCount'
// import UserRolePieChart from './functions/UserRolePieChart'
// import AdminUserStats from './functions/AdminUserStats'
// import LogoutButton from '../LogoutButton'

// export default function AdminDashboard() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
//       <LogoutButton/>
//       <AdminUserStats/>

//     </div>

//   )
// }

// AdminDashboard.jsx
import React from "react";
import UserCount from "./functions/UserCount";
import UserRolePieChart from "./functions/UserRolePieChart";
import AdminUserStats from "./functions/AdminUserStats";
import LogoutButton from "../LogoutButton";
import AdminOrderStats from "./functions/AdminOrderStats";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-neutral-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between  items-center mb-8">
          <h1 className="text-3xl font-bold text-primary-800">
            Admin Dashboards
          </h1>
          <LogoutButton />
        </div>

        <div className="bg-surface rounded-xl shadow-sm p-6">
          {/* <h2 className="text-xl font-semibold text-neutral-800 mb-6">User Statistics</h2> */}
          <AdminUserStats />
          {/* <AdminOrderStats /> */}
        </div>
      </div>
    </div>
  );
}
