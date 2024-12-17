// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const DisplayProducts = () => {
//     const [products, setProducts] = useState([]); // State for products
//     const [message, setMessage] = useState(""); // Message for errors or notifications
//     const [loading, setLoading] = useState(false); // State for loading

//     // Fetch products by supplier
//     const fetchProducts = async () => {
//         setLoading(true);
//         setMessage(""); // Clear any previous messages

//         try {
//             const token = localStorage.getItem("token"); // Fetch token from local storage
//             const response = await axios.get("/supplier/product/read", {
//                 headers: {
//                     Authorization: `Bearer ${token}`, // Pass token for authentication
//                 },
//             });

//             setProducts(response.data.products); // Set products data
//         } catch (error) {
//             console.error("Error fetching products:", error.response?.data || error.message);
//             setMessage(error.response?.data?.message || "Failed to fetch products. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // UseEffect to fetch products on component mount
//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     return (
//         <div>
//             <h1>My Products</h1>
//             {loading ? (
//                 <p>Loading products...</p>
//             ) : message ? (
//                 <p>{message}</p>
//             ) : products.length > 0 ? (
//                 <ul>
//                     {products.map((product) => (
//                         <li key={product._id}>
//                             <strong>{product.name}</strong>: {product.description} (${product.price})
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No products found.</p>
//             )}
//         </div>
//     );
// };

// export default DisplayProducts;

// when using ManageProducts Components

// import React from "react";
// import axios from "axios";

// const DisplayProducts = ({ products, setProducts, message }) => {
//     const handleDelete = async (id) => {
//         try {
//             const token = localStorage.getItem("token"); // Fetch token from local storage
//             const response = await axios.delete(`/supplier/product/delete/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`, // Pass token for authentication
//                 },
//             });

//             alert(response.data.message); // Notify the user about successful deletion

// Reove the deleted product from the local state
//             setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
//         } catch (error) {
//             console.error("Error deleting product:", error.response?.data || error.message);
//             alert(error.response?.data?.message || "Failed to delete product. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <h2>My Products</h2>
//             {products.length > 0 ? (
//                 <ul>
//                     {products.map((product) => (
//                         <li key={product._id}>
//                             <strong>{product.name}</strong>: {product.description} (${product.price})
//                             <button onClick={() => handleDelete(product._id)} style={{ marginLeft: "10px" }}>
//                                 Delete
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             ) : message ? (
//                 <p>{message}</p>
//             ) : (
//                 <p>No products found.</p>
//             )}
//         </div>
//     );
// };

// export default DisplayProducts;

import React from "react";
import axios from "axios";

const DisplayProducts = ({
  products,
  setProducts,
  setProductToEdit,
  message,
}) => {
  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Fetch token from local storage
      const response = await axios.delete(`/supplier/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      });

      alert(response.data.message); // Notify the user about successful deletion

      // Remove the deleted product from the local state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error(
        "Error deleting product:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "Failed to delete product. Please try again."
      );
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center my-10">My Products</h2>
      {products.length > 0 ? (
        <ul className="flex justify-center items-center gap-8 flex-col">
          {products.map((product) => (
            <li key={product._id} className="flex justify-between items-center w-[80%] bg-gray-100 py-6 px-10 border rounded-lg shadow-sm">
              <div>
              <span className="block">
                <strong>{product.name}</strong>  
              </span>
              <span className="block my-1 text-sm">
              {product.description}
              </span>
              <span className="block">
                <span className="font-semibold">Price: </span>
              ${product.price}{/* Edit Button */}
              </span>
              </div>
              
              <div className="flex justify-center items-center gap-5">
                {/* Delete Button */}
              <button
                onClick={() => handleDelete(product._id)}
                className="text-sm px-3 py-1 text-white bg-[red] rounded-md hover:bg-[#ff4f4f] transition-all duration-300"
              >
                Delete
              </button>

              <button
                onClick={() => setProductToEdit(product)}
                className="text-sm px-3 py-1 text-white bg-[gray] rounded-md hover:bg-[#b1b1b1] transition-all duration-300"
              >
                Edit
              </button>
              
              </div>
            </li>
          ))}
        </ul>
      ) : message ? (
        <p>{message}</p>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default DisplayProducts;
