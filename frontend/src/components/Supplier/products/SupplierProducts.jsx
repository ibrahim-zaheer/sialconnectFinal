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
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import AddProduct from "./AddProduct";

// const SupplierProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [priceRange, setPriceRange] = useState(10000);
//   const [favorites, setFavorites] = useState([]);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const activeTab = queryParams.get('tab') || 'your-products';

//   const user = useSelector((state) => state.user);
//   const userId = user?.id;

//   const isTabActive = (tabName) => {
//     return activeTab === tabName;
//   };

//   const setActiveTab = (tab) => {
//     navigate(`?tab=${tab}`, { replace: true });
//     if (tab !== 'add-products') {
//       fetchSupplierProducts(tab);
//     }
//   };

//   const fetchSupplierProducts = async (tab = activeTab) => {
//     setLoading(true);
//     setMessage("");

//     try {
//       const token = localStorage.getItem("token");
//       const endpoint = tab === "your-products"
//         ? "/api/supplier/product/read"
//         : "/api/supplier/product/readAllProducts";

//       const response = await axios.get(endpoint, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setProducts(tab === "your-products" ? response.data.products : response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error.response?.data || error.message);
//       setMessage(error.response?.data?.message || "Failed to load products. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addProductToList = (newProduct) => {
//     setProducts((prevProducts) => [...prevProducts, newProduct]);
//     setActiveTab('your-products');
//     setMessage("Product added successfully!");
//   };

//   useEffect(() => {
//     if (userId) {
//       const fetchFavorites = async () => {
//         try {
//           const response = await axios.get(`/api/favourites/favorites/id/${userId}`);
//           const favoriteIds = response.data.favorites.map((product) => product._id);
//           setFavorites(favoriteIds);
//         } catch (error) {
//           console.error("Error fetching favorites:", error);
//         }
//       };
//       fetchFavorites();
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (activeTab !== 'add-products') {
//       fetchSupplierProducts();
//     }
//   }, [activeTab]);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const searchedProducts = Array.isArray(products)
//     ? products.filter((product) =>
//         product.name.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : [];

//   return (
//     <div className="flex min-h-screen mt-16 bg-neutral-100">
//       {/* Sidebar Navigation */}
//       <div className="w-64 bg-white shadow-md fixed h-full">
//         <div className="p-4 border-b border-neutral-200">
//           <h2 className="text-xl font-semibold text-primary-800">Products</h2>
//         </div>
//         <nav className="mt-6">
//           <NavLink
//             to="?tab=your-products"
//             className={`flex items-center px-6 py-3 text-sm font-medium ${
//               isTabActive('your-products')
//                 ? "bg-primary-100 text-primary-800 border-r-4 border-primary-600"
//                 : "text-neutral-600 hover:bg-neutral-100"
//             }`}
//           >
//             <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//             </svg>
//             Your Products
//           </NavLink>
//           <NavLink
//             to="?tab=all-products"
//             className={`flex items-center px-6 py-3 text-sm font-medium ${
//               isTabActive('all-products')
//                 ? "bg-primary-100 text-primary-800 border-r-4 border-primary-600"
//                 : "text-neutral-600 hover:bg-neutral-100"
//             }`}
//           >
//             <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//             </svg>
//             All Products
//           </NavLink>
//           <NavLink
//             to="?tab=add-products"
//             className={`flex items-center px-6 py-3 text-sm font-medium ${
//               isTabActive('add-products')
//                 ? "bg-primary-100 text-primary-800 border-r-4 border-primary-600"
//                 : "text-neutral-600 hover:bg-neutral-100"
//             }`}
//           >
//             <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//             Add Products
//           </NavLink>
//         </nav>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 ml-64 p-8">
//         {activeTab === 'add-products' ? (
//           <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
//             <div className="flex justify-between items-center mb-6">
//               <h1 className="text-2xl font-bold text-neutral-900">Add New Product</h1>
//               <button
//                 onClick={() => setActiveTab('your-products')}
//                 className="text-primary-600 hover:text-primary-800 flex items-center"
//               >
//                 <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to Products
//               </button>
//             </div>
//             <AddProduct
//               onProductCreated={addProductToList}
//               className="mt-6"
//             />
//           </div>
//         ) : (
//           <>
//             {/* Header and Search */}
//             <div className="flex justify-between items-center mb-8">
//               <h1 className="text-2xl font-bold text-neutral-900">
//                 {activeTab === "your-products" ? "Your Products" : "All Products"}
//               </h1>

//               <div className="relative w-1/3">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                 />
//                 <svg className="absolute right-3 top-2.5 h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//             </div>

//             <h1 className="text-center text-3xl font-semibold my-10">My Products</h1>

//             {/* Display Products */}
//             {loading ? (
//               <p className="text-center text-gray-500">Loading products...</p>
//             ) : message ? (
//               <p className="text-center text-red-500">{message}</p>
//             ) : searchedProducts.length > 0 ? (
//               <div className="flex flex-wrap justify-center items-center gap-8 mt-4 bg-gray-100 rounded-lg w-[80vw] mx-auto p-8 my-5">
//                 {searchedProducts.map((product) => (
//                   <div
//                     key={product._id}
//                     className="w-full sm:w-1/2 lg:w-[30%] bg-white shadow-md rounded-lg py-8 px-5"
//                   >
//                     <div className="flex justify-between gap-4">
//                       <div className="flex-1">
//                         <h1 className="text-lg font-bold">{product.name}</h1>
//                         <p className="text-sm text-gray-500 mt-2">
//                           Price: Rs {product.price} per piece
//                         </p>
//                         <p className="text-sm text-gray-600 mt-2">
//                           {product.description || "No description provided"}
//                         </p>
//                       </div>
//                       <div className="flex flex-col items-end">
//                         <img
//                           src={product.image?.[0] || "https://via.placeholder.com/100"}
//                           alt="Product"
//                           className="w-24 h-24 object-cover rounded-lg"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500 mt-4">No products found.</p>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SupplierProducts;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import AddProduct from "./AddProduct";

// const SupplierProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [priceRange, setPriceRange] = useState(10000);
//   const [favorites, setFavorites] = useState([]);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const activeTab = queryParams.get('tab') || 'your-products';

//   const user = useSelector((state) => state.user);
//   const userId = user?.id;

//   // Custom function to check active tab
//   const isTabActive = (tabName) => {
//     return activeTab === tabName;
//   };

//   const setActiveTab = (tab) => {
//     navigate(`?tab=${tab}`, { replace: true });
//     if (tab !== 'add-products') {
//       fetchSupplierProducts(tab);
//     }
//   };

//   const fetchSupplierProducts = async (tab = activeTab) => {
//     setLoading(true);
//     setMessage("");

//     try {
//       const token = localStorage.getItem("token");
//       const endpoint = tab === "your-products"
//         ? "/api/supplier/product/read"
//         : "/api/supplier/product/readAllProducts";

//       const response = await axios.get(endpoint, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setProducts(tab === "your-products" ? response.data.products : response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error.response?.data || error.message);
//       setMessage(error.response?.data?.message || "Failed to load products. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addProductToList = (newProduct) => {
//     setProducts((prevProducts) => [...prevProducts, newProduct]);
//     setActiveTab('your-products');
//     setMessage("Product added successfully!");
//   };

//   useEffect(() => {
//     if (userId) {
//       const fetchFavorites = async () => {
//         try {
//           const response = await axios.get(`/api/favourites/favorites/id/${userId}`);
//           const favoriteIds = response.data.favorites.map((product) => product._id);
//           setFavorites(favoriteIds);
//         } catch (error) {
//           console.error("Error fetching favorites:", error);
//         }
//       };
//       fetchFavorites();
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (activeTab !== 'add-products') {
//       fetchSupplierProducts();
//     }
//   }, [activeTab]);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handlePriceChange = (e) => {
//     setPriceRange(parseInt(e.target.value));
//   };

//   const toggleFavorite = async (productId) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (favorites.includes(productId)) {
//         await axios.post("/api/favourites/remove-from-favorites",
//           { userId, productId },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== productId));
//       } else {
//         await axios.post("/api/favourites/add-to-favorites",
//           { userId, productId },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setFavorites((prevFavorites) => [...prevFavorites, productId]);
//       }
//     } catch (error) {
//       console.error("Error toggling favorite:", error);
//     }
//   };

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const isWithinPrice = product.price <= priceRange;
//     return matchesSearch && isWithinPrice;
//   });

//   return (
//     <div className="flex min-h-screen mt-16 bg-neutral-100">
//       {/* Sidebar Navigation */}
//       <div className="w-64 bg-white shadow-md fixed h-full">
//         <div className="p-4 border-b border-neutral-200">
//           <h2 className="text-xl font-semibold text-primary-800">Products</h2>
//         </div>
//         <nav className="mt-6">
//           <NavLink
//             to="?tab=your-products"
//             className={`flex items-center px-6 py-3 text-sm font-medium ${
//               isTabActive('your-products')
//                 ? "bg-primary-100 text-primary-800 border-r-4 border-primary-600"
//                 : "text-neutral-600 hover:bg-neutral-100"
//             }`}
//           >
//             <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//             </svg>
//             Your Products
//           </NavLink>
//           <NavLink
//             to="?tab=all-products"
//             className={`flex items-center px-6 py-3 text-sm font-medium ${
//               isTabActive('all-products')
//                 ? "bg-primary-100 text-primary-800 border-r-4 border-primary-600"
//                 : "text-neutral-600 hover:bg-neutral-100"
//             }`}
//           >
//             <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//             </svg>
//             All Products
//           </NavLink>
//           <NavLink
//             to="?tab=add-products"
//             className={`flex items-center px-6 py-3 text-sm font-medium ${
//               isTabActive('add-products')
//                 ? "bg-primary-100 text-primary-800 border-r-4 border-primary-600"
//                 : "text-neutral-600 hover:bg-neutral-100"
//             }`}
//           >
//             <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//             Add Products
//           </NavLink>
//         </nav>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 ml-64 p-8">
//         {activeTab === 'add-products' ? (
//           <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
//             <div className="flex justify-between items-center mb-6">
//               {/* <h1 className="text-2xl font-bold text-neutral-900">Add New Product</h1> */}
//               {/* <button
//                 onClick={() => setActiveTab('your-products')}
//                 className="text-primary-600 hover:text-primary-800 flex items-center"
//               >
//                 <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to Products
//               </button> */}
//             </div>
//             <AddProduct
//               onProductCreated={addProductToList}
//               className="mt-6"
//             />
//           </div>
//         ) : (
//           <>
//             {/* Header and Search */}
//             <div className="flex justify-between items-center mb-8">
//               <h1 className="text-2xl font-bold text-neutral-900">
//                 {activeTab === "your-products" ? "Your Products" : "All Products"}
//               </h1>

//               <div className="relative w-1/3">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                 />
//                 <svg className="absolute right-3 top-2.5 h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//             </div>

//             {/* Price Filter - Only show for All Products
//             {activeTab === "all-products" && (
//               <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
//                 <h2 className="text-lg font-semibold text-neutral-800 mb-4">Filter by Price</h2>
//                 <div className="w-full">
//                   <input
//                     type="range"
//                     min="0"
//                     max="10000"
//                     value={priceRange}
//                     className="range range-primary"
//                     step="50"
//                     onChange={handlePriceChange}
//                   />
//                   <div className="flex justify-between text-neutral-600 text-sm mt-2">
//                     <span>Rs 0</span>
//                     <span>Rs {priceRange}</span>
//                     <span>Rs 10000</span>
//                   </div>
//                 </div>
//               </div>
//             )} */}

//             {/* Status Messages */}
//             {message && (
//               <div className={`p-4 mb-6 rounded ${
//                 message.includes("Failed") ? "bg-red-100 border-l-4 border-red-500 text-red-700"
//                                          : "bg-green-100 border-l-4 border-green-500 text-green-700"
//               }`}>
//                 <p>{message}</p>
//               </div>
//             )}

//             {/* Products Grid */}
//             {loading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
//               </div>
//             ) : filteredProducts.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredProducts.map((product) => (
//                   <div key={product._id} className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
//                     <div className="p-6">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h2 className="text-xl font-semibold text-neutral-900">{product.name}</h2>
//                           <p className="text-primary-600 font-medium mt-1">Rs {product.price.toLocaleString()} per piece</p>
//                         </div>
//                         {/* {activeTab === "all-products" && (
//                           <button onClick={() => toggleFavorite(product._id)} className="text-neutral-400 hover:text-primary-500 transition-colors duration-200">
//                             {favorites.includes(product._id) ? (
//                               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M10 18.35l-1.45-1.32C3.4 12.36 0 9.28 0 5.5 0 2.42 2.42 0 5.5 0c1.74 0 3.41.81 4.5 2.09C10.09.81 11.76 0 13.5 0 16.58 0 19 2.42 19 5.5c0 3.78-3.4 6.86-8.55 11.54L10 18.35z" clipRule="evenodd" />
//                               </svg>
//                             ) : (
//                               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                               </svg>
//                             )}
//                           </button>
//                         )} */}
//                       </div>

//                       <div className="mt-4">
//                         <p className="text-neutral-600 text-sm">{product.description}</p>
//                       </div>

//                       {product.image && (
//                         <div className="mt-4 flex justify-center">
//                           <img src={product.image} alt={product.name} className="h-32 object-contain rounded" />
//                         </div>
//                       )}

//                       <div className="mt-6 flex justify-between items-center">
//                         {/* <span className={`text-xs px-2 py-1 rounded-full ${
//                           product.inStock ? "bg-secondary-100 text-secondary-800" : "bg-neutral-100 text-neutral-800"
//                         }`}>
//                           {product.inStock ? "In Stock" : "Out of Stock"}
//                         </span> */}
//                         <Link
//                           to={`/supplier/product/${product._id}?tab=${activeTab}`}
//                           className="text-primary-600 hover:text-primary-800 font-medium text-sm flex items-center"
//                         >
//                           View Details
//                           <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                           </svg>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg shadow p-8 text-center">
//                 <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <h3 className="mt-2 text-lg font-medium text-neutral-900">No products found</h3>
//                 <p className="mt-1 text-neutral-500">
//                   {searchQuery || priceRange < 10000
//                     ? "No products match your search criteria"
//                     : activeTab === "your-products"
//                     ? "You haven't added any products yet"
//                     : "No products available"}
//                 </p>
//                 {activeTab === "your-products" && (
//                   <div className="mt-6">
//                     <button
//                       onClick={() => setActiveTab('add-products')}
//                       className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
//                     >
//                       <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                       </svg>
//                       Add New Product
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SupplierProducts;

import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddProduct from "./AddProduct";
import EditProductForm from "./EditProductForm";

const SupplierProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(10000);
  const [favorites, setFavorites] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get("tab") || "your-products";

  const user = useSelector((state) => state.user);
  const userId = user?.id;

  // Custom function to check active tab
  const isTabActive = (tabName) => {
    return activeTab === tabName;
  };

  const isProfileComplete = () => {
    return user?.cnic && user?.city;
  };

  // Toggle the product visibility (enable_view)
  const toggleProductView = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `/api/supplier/product/toggle-view/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Show success message
      setMessage(response.data.message);

      // Update the product list locally
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id
            ? { ...product, enable_view: !product.enable_view }
            : product
        )
      );
    } catch (error) {
      console.error(
        "Error toggling product visibility:",
        error.response?.data || error.message
      );
      setMessage(
        error.response?.data?.message ||
          "Failed to toggle product visibility. Please try again."
      );
    }
  };

  // Add this function inside the SupplierProducts component
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const token = localStorage.getItem("token");

      const checkresponse = await axios.get(
        `/api/supplier/product/check-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (checkresponse.data.activeOrders > 0) {
        // If there are active orders, show an alert and prevent deletion
        alert(
          "Product cannot be deleted because it is associated with active orders."
        );
        return;
      }

      const response = await axios.delete(
        `/api/supplier/product/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      // Remove the deleted product from the local state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error(
        "Error deleting product:",
        error.response?.data || error.message
      );
      setMessage(
        error.response?.data?.message ||
          "Failed to delete product. Please try again."
      );
    }
  };

  // const setActiveTab = (tab) => {
  //   navigate(`?tab=${tab}`, { replace: true });
  //   if (tab !== 'add-products') {
  //     fetchSupplierProducts(tab);
  //   }
  // };

  const setActiveTab = (tab) => {
    if (tab === "add-products" && !isProfileComplete()) {
      alert(
        "Please fill all your profile details (CNIC and City) before adding products."
      );
      // Don't switch tab to add-products
      return;
    }
    navigate(`?tab=${tab}`, { replace: true });
    if (tab !== "add-products") {
      fetchSupplierProducts(tab);
    }
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
    setMessage("Product updated successfully!");
  };

  const fetchSupplierProducts = async (tab = activeTab) => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const endpoint =
        tab === "your-products"
          ? "/api/supplier/product/read"
          : "/api/supplier/product/readAllProducts";

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(
        tab === "your-products" ? response.data.products : response.data
      );
    } catch (error) {
      console.error(
        "Error fetching products:",
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

  const addProductToList = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setActiveTab("your-products");
    setMessage("Product added successfully!");
  };

  useEffect(() => {
    if (userId) {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(
            `/api/favourites/favorites/id/${userId}`
          );
          const favoriteIds = response.data.favorites.map(
            (product) => product._id
          );
          setFavorites(favoriteIds);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchFavorites();
    }
  }, [userId]);

  useEffect(() => {
    if (activeTab !== "add-products") {
      fetchSupplierProducts();
    }
  }, [activeTab]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceRange(parseInt(e.target.value));
  };

  const toggleFavorite = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (favorites.includes(productId)) {
        await axios.post(
          "/api/favourites/remove-from-favorites",
          { userId, productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFavorites((prevFavorites) =>
          prevFavorites.filter((id) => id !== productId)
        );
      } else {
        await axios.post(
          "/api/favourites/add-to-favorites",
          { userId, productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFavorites((prevFavorites) => [...prevFavorites, productId]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isWithinPrice = product.price <= priceRange;
    return matchesSearch && isWithinPrice;
  });

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
              isTabActive("your-products")
                ? "bg-primary-100 text-primary-800 border-r-4 border-primary-600"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            Your Products
          </NavLink>
          <NavLink
            to="?tab=all-products"
            className={`flex items-center px-6 py-3 text-sm font-medium ${
              isTabActive("all-products")
                ? "bg-primary-100 text-primary-800 border-r-4 border-primary-600"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            All Products
          </NavLink>
          {/* <NavLink
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
          </NavLink> */}
          <NavLink
            to="?tab=add-products"
            onClick={(e) => {
              if (!isProfileComplete()) {
                e.preventDefault();
                alert(
                  "Please fill all your profile details (CNIC and City) before adding products."
                );
              }
            }}
            className={`flex items-center px-6 py-3 text-sm font-medium ${
              isTabActive("add-products")
                ? "bg-primary-100 text-primary-800 border-r-4 border-primary-600"
                : "text-neutral-600 hover:bg-neutral-100"
            } ${!isProfileComplete() ? "cursor-not-allowed opacity-50" : ""}`} // visually disable it
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Products
          </NavLink>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-8">
        {activeTab === "add-products" ? (
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
            <div className="flex justify-between items-center mb-6"></div>
            <AddProduct onProductCreated={addProductToList} className="mt-6" />
          </div>
        ) : (
          <>
            {/* Header and Search */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-neutral-900">
                {activeTab === "your-products"
                  ? "Your Products"
                  : "All Products"}
              </h1>

              <div className="relative w-1/3">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
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

            {/* Status Messages */}
            {message && (
              <div
                className={`p-4 mb-6 rounded ${
                  message.includes("Failed")
                    ? "bg-red-100 border-l-4 border-red-500 text-red-700"
                    : "bg-green-100 border-l-4 border-green-500 text-green-700"
                }`}
              >
                <p>{message}</p>
              </div>
            )}

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-semibold text-neutral-900">
                            {product.name}
                          </h2>
                          <p className="text-primary-600 font-medium mt-1">
                            Rs {product.price.toLocaleString()} per piece
                          </p>
                          {product.discounts &&
                            product.discounts.length > 0 &&
                            product.discounts[0].discountedPrice && (
                              <p className="text-primary-600 font-medium mt-1">
                                Rs {product.discounts[0].discountedPrice} per
                                piece
                              </p>
                            )}
                        </div>
                        {activeTab === "your-products" && (
                          <div className="flex justify-center items-center gap-3">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="text-gray-600 hover:text-gray-800"
                              title="Edit product"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>

                            <button
                              onClick={() => handleDelete(product._id)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete product"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>

                            {/* Toggle Visibility with Eye Icon */}
                            <button
                              onClick={() => toggleProductView(product._id)}
                              className={`text-${
                                product.enable_view ? "green" : "gray"
                              }-600 hover:text-${
                                product.enable_view ? "green" : "gray"
                              }-800 text-lg`}
                              title={
                                product.enable_view
                                  ? "Hide Product"
                                  : "Show Product"
                              }
                            >
                              <i
                                className={`ri-${
                                  product.enable_view
                                    ? "eye-line"
                                    : "eye-off-line"
                                } w-5 h-5`}
                              ></i>
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        <p className="text-neutral-600 text-sm">
                          {product.description.length > 100
                            ? `${product.description.substring(0, 100)}...`
                            : product.description}
                        </p>
                      </div>

                      {/* {product.image && (
                        <div className="mt-4 flex justify-center">
                          <img src={product.image} alt={product.name} className="h-32 object-contain rounded" />
                        </div>
                      )} */}
                      {product.image && (
                        <div className="mt-4 flex justify-center">
                          <img
                            src={
                              Array.isArray(product.image)
                                ? product.image[0]
                                : product.image
                            }
                            alt={product.name}
                            className="h-32 object-contain rounded"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/300?text=No+Image";
                            }}
                          />
                        </div>
                      )}

                      {/* <div className="mt-6 flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          product.inStock ? "bg-secondary-100 text-secondary-800" : "bg-neutral-100 text-neutral-800"
                        }`}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div> */}
                      <Link
                        to={`/supplier/product/${product._id}?tab=${activeTab}`}
                        className="text-primary-600 hover:text-white hover:bg-primary-800 duration-300 transition-all  font-medium text-sm border-2 rounded-lg border-primary-600 p-2 mt-5 flex justify-center items-center"
                      >
                        View Details
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-neutral-900">
                  No products found
                </h3>
                <p className="mt-1 text-neutral-500">
                  {searchQuery || priceRange < 10000
                    ? "No products match your search criteria"
                    : activeTab === "your-products"
                    ? "You haven't added any products yet"
                    : "No products available"}
                </p>
              </div>
            )}
          </>
        )}
      </div>
      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </div>
  );
};

export default SupplierProducts;
