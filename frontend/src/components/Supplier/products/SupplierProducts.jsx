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
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddProduct from "./AddProduct";

const SupplierProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(10000);
  const [favorites, setFavorites] = useState([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get('tab') || 'your-products';

  const user = useSelector((state) => state.user);
  const userId = user?.id;

  // Custom function to check active tab
  const isTabActive = (tabName) => {
    return activeTab === tabName;
  };

  const setActiveTab = (tab) => {
    navigate(`?tab=${tab}`, { replace: true });
    if (tab !== 'add-products') {
      fetchSupplierProducts(tab);
    }
  };

  const fetchSupplierProducts = async (tab = activeTab) => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const endpoint = tab === "your-products" 
        ? "/api/supplier/product/read" 
        : "/api/supplier/product/readAllProducts";
      
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(tab === "your-products" ? response.data.products : response.data);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addProductToList = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setActiveTab('your-products');
    setMessage("Product added successfully!");
  };

  useEffect(() => {
    if (userId) {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(`/api/favourites/favorites/id/${userId}`);
          const favoriteIds = response.data.favorites.map((product) => product._id);
          setFavorites(favoriteIds);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchFavorites();
    }
  }, [userId]);

  useEffect(() => {
    if (activeTab !== 'add-products') {
      fetchSupplierProducts();
    }
  }, [activeTab]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // // Filter products based on the search query
  // const searchedProducts = products.filter((product) =>
  //   product.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  const searchedProducts = Array.isArray(products)
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="flex min-h-screen mt-16 bg-neutral-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-md fixed h-full">
        <div className="p-4 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-primary-800">Products</h2>
        </div>
        <nav className="mt-6">
          <NavLink
            to="?tab=your-products"
            className={`flex items-center px-6 py-3 text-sm font-medium ${
              isTabActive('your-products') 
                ? "bg-primary-100 text-primary-800 border-r-4 border-primary-600" 
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Your Products
          </NavLink>
          <NavLink
            to="?tab=all-products"
            className={`flex items-center px-6 py-3 text-sm font-medium ${
              isTabActive('all-products') 
                ? "bg-primary-100 text-primary-800 border-r-4 border-primary-600" 
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            All Products
          </NavLink>
          <NavLink
            to="?tab=add-products"
            className={`flex items-center px-6 py-3 text-sm font-medium ${
              isTabActive('add-products') 
                ? "bg-primary-100 text-primary-800 border-r-4 border-primary-600" 
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Products
          </NavLink>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-8">
        {activeTab === 'add-products' ? (
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-neutral-900">Add New Product</h1>
              <button 
                onClick={() => setActiveTab('your-products')}
                className="text-primary-600 hover:text-primary-800 flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Products
              </button>
            </div>
            <AddProduct 
              onProductCreated={addProductToList} 
              className="mt-6"
            />
          </div>
        ) : (
          <>
            {/* Header and Search */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-neutral-900">
                {activeTab === "your-products" ? "Your Products" : "All Products"}
              </h1>
              
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
                  {/* <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt="Product"
                    className="w-24 h-24 object-cover rounded-lg"
                  /> */}
                  <img
                    src={
                      product.image?.[0] || "https://via.placeholder.com/100"
                    } // default if image missing
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