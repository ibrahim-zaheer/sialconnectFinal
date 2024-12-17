// import { useState, useEffect } from "react";
// import axios from "axios";

// const SupplierProducts = () => {
//   const [products, setProducts] = useState([]); // Products state
//   const [loading, setLoading] = useState(false); // Loading state
//   const [message, setMessage] = useState(""); // Error or notification message

//   // Fetch supplier's products
//   const fetchSupplierProducts = async () => {
//     setLoading(true);
//     setMessage(""); // Reset message

//     try {
//       const token = localStorage.getItem("token"); // Fetch token from storage
//       const response = await axios.get("/supplier/product/read", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setProducts(response.data.products); // Set fetched products
//     } catch (error) {
//       console.error(
//         "Error fetching supplier products:",
//         error.response?.data || error.message
//       );
//       setMessage(
//         error.response?.data?.message ||
//           "Failed to load products. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch products on component mount
//   useEffect(() => {
//     fetchSupplierProducts();
//   }, []);

//   return (
//     <div className="w-full py-4">
//       <h2 className="text-2xl text-center font-semibold text-[#1b263b]">
//         My Products
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading products...</p>
//       ) : message ? (
//         <p className="text-center text-red-500">{message}</p>
//       ) : products.length === 0 ? (
//         <p className="text-center text-gray-500">No products found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="border p-4 rounded-lg shadow-md bg-white"
//             >
//               <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
//               <p className="text-gray-700">Price: ${product.price}</p>
//               <p className="text-gray-500">
//                 Category: {product.category || "N/A"}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SupplierProducts;

















import { useState, useEffect } from "react";
import axios from "axios";

const SupplierProducts = () => {
  const [products, setProducts] = useState([]); // Products state
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Error or notification message
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Fetch supplier's products
  const fetchSupplierProducts = async () => {
    setLoading(true);
    setMessage(""); // Reset message

    try {
      const token = localStorage.getItem("token"); // Fetch token from storage
      const response = await axios.get("/supplier/product/read", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.products); // Set fetched products
    } catch (error) {
      console.error(
        "Error fetching supplier products:",
        error.response?.data || error.message
      );
      setMessage(
        error.response?.data?.message ||
          "Failed to load products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchSupplierProducts();
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
          placeholder="Search your products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <h1 className="text-center text-3xl font-semibold my-10">My Products</h1>

      {/* Display Products */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : message ? (
        <p className="text-center text-red-500">{message}</p>
      ) : searchedProducts.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center gap-8 mt-4 bg-gray-100 rounded-lg w-[80vw] mx-auto p-8 my-5">
          {searchedProducts.map((product) => (
            <div
              key={product._id}
              className="w-full sm:w-1/2 lg:w-[30%] bg-white shadow-md rounded-lg py-8 px-5"
            >
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-lg font-bold">{product.name}</h1>
                  <p className="text-sm text-gray-500 mt-2">
                    Price: Rs {product.price} per piece
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {product.description || "No description provided"}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt="Product"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No products found.</p>
      )}
    </div>
  );
};

export default SupplierProducts;
