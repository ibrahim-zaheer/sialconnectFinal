import React from 'react'
import AdminOrderDetails from '../../components/orders/admin/AdminOrderDetails'
import BackButton from '../../components/BackButton'

export default function AdminOrderDetailsPage() {
  return (
    <div>
         <div className="pt-20"></div>
         <BackButton/>
      <AdminOrderDetails/>
    </div>
  )
}
