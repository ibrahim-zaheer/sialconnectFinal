// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const DisplayProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch all products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("/api/supplier/product/readAllProducts"); // API endpoint for 
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Filter products based on the search query
//   const searchedProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="mt-24 text-[#1b263b]">
//       {/* Search Input */}
//       <div className="flex justify-center mt-4">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//           className="border border-gray-300 rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <h1 className="text-center text-3xl font-semibold my-10">All Products</h1>

//       {/* Display Products */}
//       <div className="flex flex-wrap justify-center items-center gap-8 mt-4 bg-gray-100 rounded-lg w-[80vw] mx-auto p-8 my-5">
//         {searchedProducts.length > 0 ? (
//           searchedProducts.map((product) => (
//             <div
//               key={product._id}
//               className="w-full sm:w-1/2 lg:w-[30%] bg-white shadow-md rounded-lg py-8 px-5"
//             >
//               <div className="flex justify-between gap-4">
//                 <div className="flex-1">
//                   <div>
//                     <h1 className="text-lg font-bold flex-1">{product.name}</h1>
//                     <p className="text-sm text-gray-500 mt-2">
//                       Price: Rs {product.price} per piece
//                     </p>
//                   </div>

//                   <p className="text-sm text-gray-600 mt-2">
//                     {product.description}
//                   </p>
//                 </div>

//                 <div className="flex flex-col items-end flex-1">
//                   <img
//                     src={product.image}
//                     alt="Product"
//                     className="w-24 h-24 object-cover rounded-lg"
//                   />

//                   <div className="mt-4">
//                     <Link
//                       to={`/supplier/product/${product._id}`}
//                       className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
//                     >
//                       View more
//                     </Link>
//                   </div>
//                 </div>
                
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DisplayProducts;















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// const DisplayProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [priceRange, setPriceRange] = useState(100); // Default max value

//   const [favorites, setFavorites] = useState([]); // Store user's favorite product IDs

//    // for accessing the user profile id
//     const user = useSelector((state) => state.user);
//     const userId = user?.id;

//   // Fetch all products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("/api/supplier/product/readAllProducts"); // API endpoint for all products
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//    // Fetch user's favorites
//   //  useEffect(() => {
//   //   if (userId) {
//   //     const fetchFavorites = async () => {
//   //       try {
//   //         const response = await axios.get(`/api/favourites/favorites/id/${userId}`);

//   //          // Extract only the product IDs from the response
//   //       const favoriteIds = response.data.favorites.map((product) => product._id);
//   //         // setFavorites(response.data.favorites);
//   //         setFavorites(favoriteIds);
//   //         console.log("favourites found are: "+response.data.favorites);
//   //       } catch (error) {
//   //         console.error("Error fetching favorites:", error);
//   //       }
//   //     };
//   //     fetchFavorites();
//   //   }
//   // }, [userId]);

//   useEffect(() => {
//     if (userId) {
//       const fetchFavorites = async () => {
//         try {
//           const response = await axios.get(`/api/favourites/favorites/id/${userId}`);
//           const favoriteIds = response.data.favorites.map((product) => product._id);
//           setFavorites(favoriteIds); // Initialize the favorites state
//         } catch (error) {
//           console.error("Error fetching favorites:", error);
//         }
//       };
//       fetchFavorites();
//     }
//   }, [userId]);

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Handle price range change
//   const handlePriceChange = (e) => {
//     setPriceRange(parseInt(e.target.value));
//   };

//   const handleAddToFavorites = (productId) => {
//     axios.post('/api/favourites/add-to-favorites', { userId, productId }).then((response) => {
//       setFavorites(response.data.user.favorites);
//     });
//   };

//   const handleRemoveFromFavorites = (productId) => {
//     axios.post('/api/favourites/remove-from-favorites', { userId, productId }).then((response) => {
//       setFavorites(response.data.user.favorites);
//     });
//   };




//   // const toggleFavorite = async (productId) => {
//   //   try {
//   //     if (favorites.includes(productId)) {
//   //       // Remove from favorites
//   //       await axios.post("/api/favourites/remove-from-favorites", { userId, productId });
//   //       setFavorites(favorites.filter((id) => id !== productId));
//   //     } else {
//   //       // Add to favorites
//   //       await axios.post("/api/favourites/add-to-favorites", { userId, productId });
//   //       setFavorites([...favorites, productId]);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error toggling favorite:", error);
//   //   }
//   // };



//   const toggleFavorite = async (productId) => {
//     try {
//       if (favorites.includes(productId)) {
//         // Remove from favorites
//         await axios.post("/api/favourites/remove-from-favorites", { userId, productId });
//         setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== productId));
//       } else {
//         // Add to favorites
//         await axios.post("/api/favourites/add-to-favorites", { userId, productId });
//         setFavorites((prevFavorites) => [...prevFavorites, productId]);
//       }
//     } catch (error) {
//       console.error("Error toggling favorite:", error);
//     }
//   };


//   // Filter products based on search query and price range
//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const isWithinPrice = product.price <= priceRange;
//     return matchesSearch && isWithinPrice;
//   });

//   return (
//     <div className="mt-24 text-[#1b263b]">
//       {/* Search & Filter UI */}
//       <div className="flex flex-col items-center mt-4">
//         {/* Search Input */}
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//           className="border border-gray-300 rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Price Filter (DaisyUI Range Slider) */}
//         <div className="mt-6 w-1/2">
//           <input
//             type="range"
//             min="0"
//             max="10000"
//             value={priceRange}
//             className="range"
//             step="50"
//             onChange={handlePriceChange}
//           />
//           <div className="flex w-full justify-between px-2 text-xs">
//             <span>Rs 0</span>
//             <span>Rs 250</span>
//             <span>Rs 500</span>
//             <span>Rs 750</span>
//             <span>Rs 10000</span>
//           </div>
//           <p className="text-center mt-2 text-lg font-semibold">Max Price: Rs {priceRange}</p>
//         </div>
//       </div>

//       <h1 className="text-center text-3xl font-semibold my-10">All Products</h1>

//       {/* Display Products */}
//       <div className="flex flex-wrap justify-center items-center gap-8 mt-4 bg-gray-100 rounded-lg w-[80vw] mx-auto p-8 my-5">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <div
//               key={product._id}
//               className="w-full sm:w-1/2 lg:w-[30%] bg-white shadow-md rounded-lg py-8 px-5"
//             >
//               <div className="flex justify-between gap-4">
//                 <div className="flex-1">
                

//                   <h1 className="text-lg font-bold">{product.name}</h1>
//                   <p className="text-sm text-gray-500 mt-2">
//                     Price: Rs {product.price} per piece
//                   </p>
//                   <p className="text-sm text-gray-600 mt-2">{product.description}</p>

//                   {/* <button className="btn btn-square">
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
// </button> */}
//                 </div>

//                 <div className="flex flex-col items-end flex-1">
//                   <img
//                     src={product.image}
//                     alt="Product"
//                     className="w-24 h-24 object-cover rounded-lg"
//                   />
//                   <div className="mt-4">

//                   <button
//   onClick={() => toggleFavorite(product._id)}
//   className="btn btn-ghost btn-sm p-0"
// >
//   {favorites.includes(product._id) ? (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-6 w-6 text-red-500"
//       viewBox="0 0 20 20"
//       fill="currentColor"
//     >
//       <path
//         fillRule="evenodd"
//         d="M10 18.35l-1.45-1.32C3.4 12.36 0 9.28 0 5.5 0 2.42 2.42 0 5.5 0c1.74 0 3.41.81 4.5 2.09C10.09.81 11.76 0 13.5 0 16.58 0 19 2.42 19 5.5c0 3.78-3.4 6.86-8.55 11.54L10 18.35z"
//         clipRule="evenodd"
//       />
//     </svg>
//   ) : (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-6 w-6 text-gray-500"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//       />
//     </svg>
//   )}
// </button>
//                     <Link
//                       to={`/supplier/product/${product._id}`}
//                       className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
//                     >
//                       View more
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DisplayProducts;





import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteToggle from "../../favourites/FavoriteToggle";

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(10000);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const user = useSelector((state) => state.user);
  const userId = user?.id;
  const role = user.role;

  const categories = ["All", ...new Set(products.map((p) => p.category || "Other"))];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/supplier/product/readAllProducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(`/api/favourites/favorites/id/${userId}`);
          setFavorites(response.data.favorites);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchFavorites();
    }
  }, [userId]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceRange(parseInt(e.target.value));
  };

  const toggleFavorite = async (productId) => {
    try {
      if (favorites.includes(productId)) {
        await axios.post("/api/favourites/remove-from-favorites", { userId, productId });
        setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== productId));
      } else {
        await axios.post("/api/favourites/add-to-favorites", { userId, productId });
        setFavorites((prevFavorites) => [...prevFavorites, productId]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const isWithinPrice = product.price <= priceRange;
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && isWithinPrice && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-neutral-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">All Products</h1>
          
          {/* Search Input */}
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
              xmlns="http://www.w3.org/2000/svg"
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

        {/* Price Filter */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">Filter by Price</h2>
          <div className="w-full">
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange}
              className="range range-primary"
              step="50"
              onChange={handlePriceChange}
            />
            <div className="flex justify-between text-neutral-600 text-sm mt-2">
              <span>Rs 0</span>
              <span>Rs {priceRange}</span>
              <span>Rs 10000</span>
            </div>
          </div>
          
          {/* Category Filter Dropdown */}
          <div className="mt-4 w-1/2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h1 className="text-center text-3xl font-semibold my-10">All Products</h1>

        {/* Display Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-neutral-900">{product.name}</h2>
                      <p className="text-primary-600 font-medium mt-1">
                        Rs {product.price.toLocaleString()} per piece
                      </p>
                      <span className="block my-1 text-sm font-bold">
                        Category: {product.category || "Other"}
                      </span>
                      <p className="text-neutral-600 text-sm mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end">
                      <img
                        src={product.image?.[0] || "https://via.placeholder.com/100"}
                        alt="Product"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    {role === "exporter" && (
                      <FavoriteToggle
                        productId={product._id}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        userId={userId}
                      />
                    )}
                    <Link
                      to={`/supplier/product/${product._id}`}
                      className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-neutral-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayProducts;