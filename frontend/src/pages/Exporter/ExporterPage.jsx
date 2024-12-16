import React from "react";
import DisplayProducts from "../../components/Exporter/products/DisplayProducts";
const ExporterPage = () => {
  return (
    <>
      <div className="w-[80vw] mx-auto mt-24">
        <div>
          <h1 className="px-3 text-2xl font-semibold">Hello, Exporter!</h1>
          <DisplayProducts />
        </div>
      </div>
    </>
  );
};

export default ExporterPage;
