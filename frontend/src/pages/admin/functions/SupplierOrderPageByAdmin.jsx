import React from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import SupplierOrdersList from "../../../components/admin/functions/SupplierOrdersList";

export default function SupplierOrderPageByAdmin() {
  const { supplierId } = useParams();
  return (
    <>
      <div className="p-10">
        {/* <BackButton label="Back to User List" className="mb-4 mt-16" /> */}
        

        <SupplierOrdersList
          supplierId={supplierId}
          apiEndpoint="/api/admin/orders/supplier"
          title="Supplier Orders (Admin View)"
        />
      </div>
    </>
  );
}
