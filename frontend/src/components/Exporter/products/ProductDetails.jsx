import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/supplier/product/${id}`); // API endpoint for fetching a product by ID
        setProduct(response.data);
      } catch (err) {
        setError("Error fetching product details.");
        console.error("Error fetching product details:", err);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (error) {
    return <div className="container mt-4 text-center">{error}</div>;
  }

  return (
    <div className="w-[80vw] mx-auto mt-24 bg-red-50 p-6 rounded-lg">
      {product ? (
        <div className="flex justify-between items-start gap-6">
          {/* Product Details Section */}
          <div className="flex-1 flex">
            <div>
              <img
                src={product.image}
                alt="Product"
                className="bg-blue-300 p-5 w-24 h-24 object-cover rounded-lg"
              />
            </div>
            <div className="flex items-center mb-4">
              <h1 className="text-2xl font-bold flex-1">{product.name}</h1>

              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-gray-500 mb-2">Price: ${product.price}</p>
              <p className="text-gray-500 mb-2">
                Supplier: {product.supplier?.name || "Unknown"}
              </p>
              <p className="text-gray-500 mb-2">
                Email Address: {product.supplier?.email || "Unknown"}
              </p>
              <p className="text-gray-500">
                Created At: {new Date(product.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Supplier Profile Picture Section */}
            <div className="ml-6">
              {product.supplier?.profilePicture ? (
                <img
                  src={product.supplier.profilePicture}
                  alt="Supplier Logo"
                  className="w-16 h-16 object-cover rounded-full"
                />
              ) : (
                <img
                  src="https://th.bing.com/th/id/OIP.mpXg7tyCFEecqgUsoW9eQwHaHk?w=206&h=210&c=7&r=0&o=5&pid=1.7"
                  alt="Default Logo"
                  className="w-16 h-16 object-cover rounded-full"
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          Loading product details...
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
