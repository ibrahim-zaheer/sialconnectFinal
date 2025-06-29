import React from 'react'
import SupplierOrderDetails from '../../components/orders/supplier/SupplierOrderDetails'
import BackButton from '../../components/BackButton'


export default function SupplierOrderDetailsPage() {
  return (
    <div>
      <div className="pt-20 bg-gray-50"></div>
        <BackButton/>
      <SupplierOrderDetails/>
    </div>
  )
}
