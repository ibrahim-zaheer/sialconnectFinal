import React from "react";

const ProductSearchBar = ({
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  showPriceFilter = true,
}) => {
  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ProductSearchBar;