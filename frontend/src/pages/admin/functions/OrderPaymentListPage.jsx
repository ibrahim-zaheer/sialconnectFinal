import React from 'react'
import OrderPaymentList from '../../../components/admin/functions/OrderPaymentList'
import LocalOrderPaymentList from '../../../components/admin/functions/LocalOrderPaymentList'
export default function OrderPaymentListPage() {
  return (
    <div>
      <OrderPaymentList/>
      <LocalOrderPaymentList/>
    </div>
  )
}
