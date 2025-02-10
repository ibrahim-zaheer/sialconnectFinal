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
        const response = await axios.get("/api/supplier/product/readAllProducts"); // API endpoint for all products
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
    <div className="mt-24 text-[#1b263b]">
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

      <h1 className="text-center text-3xl font-semibold my-10">All Products</h1>

      {/* Display Products */}
      <div className="flex flex-wrap justify-center items-center gap-8 mt-4 bg-gray-100 rounded-lg w-[80vw] mx-auto p-8 my-5">
        {searchedProducts.length > 0 ? (
          searchedProducts.map((product) => (
            <div
              key={product._id}
              className="w-full sm:w-1/2 lg:w-[30%] bg-white shadow-md rounded-lg py-8 px-5"
            >
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <div>
                    <h1 className="text-lg font-bold flex-1">{product.name}</h1>
                    <p className="text-sm text-gray-500 mt-2">
                      Price: Rs {product.price} per piece
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-col items-end flex-1">
                  <img
                    src={product.image}
                    alt="Product"
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="mt-4">
                    <Link
                      to={`/supplier/product/${product._id}`}
                      className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      View more
                    </Link>
                  </div>
                </div>
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
