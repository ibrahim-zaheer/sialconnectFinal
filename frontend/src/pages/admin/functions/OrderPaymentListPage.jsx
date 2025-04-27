// import React from 'react'
// import OrderPaymentList from '../../../components/admin/functions/OrderPaymentList'
// import LocalOrderPaymentList from '../../../components/admin/functions/LocalOrderPaymentList'
// export default function OrderPaymentListPage() {
//   return (
//     <div>
//       <OrderPaymentList/>
//       <LocalOrderPaymentList/>
//     </div>
//   )
// }

// OrderPaymentListPage.jsx
import React from 'react';
import OrderPaymentList from '../../../components/admin/functions/OrderPaymentList';
import LocalOrderPaymentList from '../../../components/admin/functions/LocalOrderPaymentList';

export default function OrderPaymentListPage() {
  return (
    <div className="space-y-8 p-6 bg-neutral-50 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto space-y-8">
        <OrderPaymentList/>
        <LocalOrderPaymentList/>
      </div>
    </div>
  );
}