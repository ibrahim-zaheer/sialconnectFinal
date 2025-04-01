import React from 'react'
import UserCount from './functions/UserCount'
import UserRolePieChart from './functions/UserRolePieChart'
import AdminUserStats from './functions/AdminUserStats'
import LogoutButton from '../LogoutButton'

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <LogoutButton/>
      <AdminUserStats/>
      
    </div>
  
  )
}
