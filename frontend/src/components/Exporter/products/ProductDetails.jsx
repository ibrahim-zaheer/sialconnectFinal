import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// for allowing people to chat with each other
import Chat from "../../Chat/Chat";
import { useSelector } from "react-redux";
// import ChatRoom from "../../Chat/ChatRoom";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  // for accessing the user profile id
  const user = useSelector((state) => state.user);
  const userId = user?.id;

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/supplier/product/${id}`); // API endpoint for fetching a product by ID
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
    <div className="w-[80vw] min-h-[80vh] mx-auto mt-24 bg-gray-50 p-6 rounded-lg">
      {product ? (
        <div className="">
          {/* Product Details Section */}
          <div className="flex justify-between">
            <div className="flex-1">
              <img
                src={product.image}
                alt="Product"
                className="object-cover rounded-lg w-96"
              />
            </div>
            <div className="flex flex-1 p-10 flex-col justify-around items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold">{product.name}</h1>
                <p className="text-gray-500 text-xl my-2">
                  {product.description}
                </p>
                <p className="text-gray-700 mb-2">Price: {product.price} Rs</p>
              </div>
              <div>
                <div className="flex justify-center items-center gap-5 mb-5">
                  {/* Supplier Profile Picture Section */}
                  <div className="">
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

                  <div>
                    <p className="text-gray-500 mb-2 text-sm">
                      {product.supplier?.name || "Unknown"}
                    </p>
                    <p className="text-gray-500 mb-2 text-sm">
                      {product.supplier?.email || "Unknown"}
                    </p>
                  </div>
                </div>

                <p className="text-gray-500">
                  {new Date(product.createdAt).toDateString()}
                </p>
                
                <p>Supplier ID:{product.supplier.id}</p>
                <p>User Id:{userId}</p>
              </div>
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
