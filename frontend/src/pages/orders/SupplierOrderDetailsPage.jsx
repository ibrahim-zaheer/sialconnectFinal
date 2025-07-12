import React from "react";
import SupplierOrderDetails from "../../components/orders/supplier/SupplierOrderDetails";
import BackButton from "../../components/BackButton";

export default function SupplierOrderDetailsPage() {
  return (
    <div className="w-full px-16 mx-auto bg-gray-50">
      <div className="pt-20 bg-gray-50"></div>
      <BackButton className="mx-5 bg-blue-600 hover:bg-blue-700 text-white" />
      
      <SupplierOrderDetails />
    </div>
  );
}
