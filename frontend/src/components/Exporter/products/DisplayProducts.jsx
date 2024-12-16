import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/supplier/product/readAllProducts"); // API endpoint for all products
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on the search query
  const searchedProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-5 text-[#1b263b]">
      <h1 className="text-center text-xl font-semibold">All Products</h1>

      {/* Search Input */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Display Products */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {searchedProducts.length > 0 ? (
          searchedProducts.map((product) => (
            <div
              key={product._id}
              className="w-full sm:w-1/2 lg:w-1/3 bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h1 className="text-lg font-bold flex-1">{product.name}</h1>
                  <p className="text-sm text-gray-500 mt-2">
                    Price: ${product.price}
                  </p>
                </div>
                <img
                  src={product.image}
                  alt="Product"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {product.description}
              </p>

              <div className="mt-4">
                <Link
                  to={`/supplier/product/${product._id}`}
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default DisplayProducts;
