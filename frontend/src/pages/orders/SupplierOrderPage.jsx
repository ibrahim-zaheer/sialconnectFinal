import React from 'react'
import SupplierOrders from '../../components/orders/supplier/SupplierOrders'
import SupplierOrderCount from '../../components/orders/supplier/SupplierOrderCount'
import HighestOrderValue from '../../components/orders/supplier/HighestOrderValue'
import TopOrderedProducts from '../../components/orders/supplier/TopOrderedProducts'
import EstimatedOrderValue from '../../components/orders/supplier/EstimatedOrderValue'
import BackButton from '../../components/BackButton'

export default function SupplierOrderPage() {
  return (
    <div>
      <div className="pt-20"></div>
    
      <SupplierOrderCount/>
      <HighestOrderValue/>
      <TopOrderedProducts/>
      {/* <EstimatedOrderValue/> */}
      <SupplierOrders/>
      
      
     
      
   
    </div>
  )
}
