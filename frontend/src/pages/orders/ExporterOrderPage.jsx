import React from 'react'
import ExporterOrders from '../../components/orders/exporter/ExporterOrders'
import SupplierOrderCount from '../../components/orders/supplier/SupplierOrderCount'
import HighestOrderValue from '../../components/orders/supplier/HighestOrderValue'
import TopOrderedProducts from '../../components/orders/supplier/TopOrderedProducts'
import BackButton from '../../components/BackButton'

export default function deExporterOrderPage() {
  return (
    <div>
      <div className="pt-20"></div>
    
        <SupplierOrderCount/>
      <HighestOrderValue/>
      <TopOrderedProducts/>
      <ExporterOrders/>
    
    </div>
  )
}
