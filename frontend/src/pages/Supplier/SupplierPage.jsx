import React from "react";
import AddProduct from "../../components/Supplier/products/AddProduct";
import DisplayProducts from "../../components/Supplier/products/DisplayProducts";
import ManageProducts from "../../components/Supplier/products/ManageProducts";

import SupplierReviews from "../../components/reviews/ReviewsBySupplier";

import { useSelector } from "react-redux";

import SupplierOrders from "../../components/orders/supplier/SupplierOrders";


const SupplierPage = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="w-full overflow-hidden mt-24">
      <SupplierOrders/>

      <ManageProducts />
      <SupplierReviews supplierId={user.id} />
      
    </div>
  );
};

export default SupplierPage;
