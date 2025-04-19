import React from 'react'
import { useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import SupplierOrdersList from '../../../components/admin/functions/SupplierOrdersList';

export default function SupplierOrderPageByAdmin() {
    const { supplierId } = useParams();
  return (
    <>
    <SupplierOrdersList
      supplierId={supplierId}
      apiEndpoint="/api/admin/orders/supplier"
      title="Supplier Orders (Admin View)"
    />
    <BackButton label="← Back to User List" className="mb-4" />
  </>
  )
}
