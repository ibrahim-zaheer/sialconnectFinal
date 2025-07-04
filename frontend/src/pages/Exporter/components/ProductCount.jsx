// components/ProductCount.jsx
import React from "react";

const ProductCount = ({ currentCount, totalCount }) => {
  if (totalCount === 0) return null;

  return (
    <div className="text-sm text-neutral-700 mb-4">
      Showing <span className="font-medium">{currentCount}</span> of{" "}
      <span className="font-medium">{totalCount}</span> products
    </div>
  );
};

export default ProductCount;
