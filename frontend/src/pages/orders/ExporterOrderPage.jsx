import React from 'react'
import ExporterOrders from '../../components/orders/exporter/ExporterOrders'
import SupplierOrderCount from '../../components/orders/supplier/SupplierOrderCount'
import HighestOrderValue from '../../components/orders/supplier/HighestOrderValue'
import TopOrderedProducts from '../../components/orders/supplier/TopOrderedProducts'

export default function ExporterOrderPage() {
  return (
    <div>
      <ExporterOrders/>
      <SupplierOrderCount/>
      <HighestOrderValue/>
      <TopOrderedProducts/>
    </div>
  )
}
