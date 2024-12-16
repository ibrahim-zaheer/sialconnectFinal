import React from "react";
import AddProduct from "../../components/Supplier/products/AddProduct";
import DisplayProducts from "../../components/Supplier/products/DisplayProducts";
import ManageProducts from "../../components/Supplier/products/ManageProducts";
const SupplierPage = () => {
  return (
    <div className="w-full overflow-hidden mt-24">
      {/* <h1 className="mt-5 w-[80vw] mx-auto text-3xl font-bold">
        Hello, Supplier!
      </h1> */}

      <ManageProducts />
    </div>
  );
};

export default SupplierPage;
