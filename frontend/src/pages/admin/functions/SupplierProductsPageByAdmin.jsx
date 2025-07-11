import React from "react";
import { useParams } from "react-router-dom";
import SupplierProductsList from "../../../components/admin/functions/SupplierProductsList";
import BackButton from "../../../components/BackButton";
const SupplierProductsPageByAdmin = () => {
  const { supplierId } = useParams();

  return (
    <>
      <div className="p-10">
        <BackButton label="Back to User List" className="mb-4 mt-16" />
        <SupplierProductsList
          supplierId={supplierId}
          apiEndpoint="/api/admin/products/supplier"
          title="Supplier Products (Admin View)"
        />
      </div>
    </>
  );
};

export default SupplierProductsPageByAdmin;
