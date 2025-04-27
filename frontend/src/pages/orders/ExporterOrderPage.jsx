import React from 'react'
import ExporterOrders from '../../components/orders/exporter/ExporterOrders'
import SupplierOrderCount from '../../components/orders/supplier/SupplierOrderCount'
import HighestOrderValue from '../../components/orders/supplier/HighestOrderValue'
import TopOrderedProducts from '../../components/orders/supplier/TopOrderedProducts'
import BackButton from '../../components/BackButton'

export default function ExporterOrderPage() {
  return (
    <div className='mt-28'>
        {/* <SupplierOrderCount/>
      <HighestOrderValue/>
      <TopOrderedProducts/> */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mx-auto">
          <div className="md:col-span-2 lg:col-span-1">
            <SupplierOrderCount />
          </div>
          <div className="md:col-span-1">
            <HighestOrderValue />
          </div>
          <div className="md:col-span-1">
            <TopOrderedProducts />
          </div>
        </div>
      <ExporterOrders/>
    
    </div>
  )
}
