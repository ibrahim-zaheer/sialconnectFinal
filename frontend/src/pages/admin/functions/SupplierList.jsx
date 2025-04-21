import React from "react";
import { useParams, Link } from "react-router-dom";
import BackButton from "../../../components/BackButton";

export default function SupplierList() {
  const { supplierId } = useParams(); // Get supplierId from the URL

  return (
    <div>
      <div className="pt-20"></div>
      <BackButton/>
      <h2 className="text-xl font-semibold">Supplier Details</h2>

      {/* Display Supplier's Order and Product Links */}
      <div className="border-b p-4">
        <h3>Supplier ID: {supplierId}</h3>

        {/* Link to Orders Page for the specific supplier */}
        <div className="mt-2">
          <Link
            to={`/admin/user/supplier/order/${supplierId}`}
            className="text-blue-600 hover:text-blue-800"
          >
            View Orders
          </Link>
        </div>

        {/* Link to Products Page for the specific supplier */}
        <div className="mt-2">
          <Link
            to={`/admin/user/supplier/product/${supplierId}`}
            className="text-blue-600 hover:text-blue-800"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}
