import React, { useState, useEffect } from "react";

const ProductSearch = ({ products, onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter the products based on search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    // Apply search filter whenever searchQuery or products change
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    onSearchResults(filteredProducts);
  }, [searchQuery, products, onSearchResults]);

  return (
    <div className="relative w-1/3">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <svg className="absolute right-3 top-2.5 h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
};

export default ProductSearch;
