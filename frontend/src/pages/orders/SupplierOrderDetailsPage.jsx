import React from 'react'
import SupplierOrderDetails from '../../components/orders/supplier/SupplierOrderDetails'
import BackButton from '../../components/BackButton'

export default function SupplierOrderDetailsPage() {
  return (
    <div>
      <div className="pt-20"></div>
        <BackButton/>
      <SupplierOrderDetails/>
    </div>
  )
}
