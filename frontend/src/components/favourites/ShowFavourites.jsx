

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function ShowFavourites() {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [priceRange, setPriceRange] = useState(100);
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const user = useSelector((state) => state.user);
//   const userId = user?.id;

//   const handleRemoveFromFavorites = async (productId) => {
//     try {
//       await axios.post("/api/favourites/remove-from-favorites", { userId, productId });
//       setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== productId));
//     } catch (error) {
//       console.error("Error removing from favorites:", error);
//       setError("Failed to remove from favorites");
//     }
//   };

//   // Fetch user's favorites
//   useEffect(() => {
//     if (userId) {
//       const fetchFavorites = async () => {
//         try {
//           const response = await axios.get(
//             `/api/favourites/favorites/${userId}`
//           );

//           // Extract only the product IDs from the response
//           const favoriteIds = response.data.favorites.map(
//             (product) => product._id
//           );
//           setFavorites(favoriteIds);
//           console.log("favourites found are: " + response.data.favorites);
//         } catch (error) {
//           console.error("Error fetching favorites:", error);
//         }
//       };
//       fetchFavorites();
//     }
//   }, [userId]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           "/api/supplier/product/readAllProducts"
//         );
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setError("Failed to load products");
//       }
//     };
//     fetchProducts();
//   }, []);

//   const favoriteProducts = products.filter((product) =>
//     favorites.includes(product._id)
//   );

//   return (
//     <div className="mt-24 text-[#1b263b]">
//       {/* Search & Filter UI */}
//       <div className="flex flex-col items-center mt-4">
//         {/* Search Input */}
//       </div>

//       <h1 className="text-center text-3xl font-semibold my-10">
//         Favorite Products
//       </h1>

//       {/* Display Favorite Products */}
//       <div className="flex flex-wrap justify-center items-center gap-8 mt-4 bg-gray-100 rounded-lg w-[80vw] mx-auto p-8 my-5">
//         {favoriteProducts.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {favoriteProducts.map((product) => (
//               <div
//                 key={product._id}
//                 className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
//               >
//                 <div className="p-6">
//                   <div className="flex justify-between items-start gap-4">
//                     <div className="flex-1">
//                       <h2 className="text-xl font-semibold text-neutral-900">{product.name}</h2>
//                       <p className="text-primary-600 font-medium mt-1">
//                         Rs {product.price.toLocaleString()} per piece
//                       </p>
//                       <p className="text-neutral-600 text-sm mt-2 line-clamp-2">
//                         {product.description}
//                       </p>
//                     </div>

//                     <div className="flex flex-col items-end flex-1">
//                       <img
//                         src={product.image?.[0] || "https://via.placeholder.com/100"}
//                         alt="Product"
//                         className="w-24 h-24 object-cover rounded-lg"
//                       />

//                       <div className="mt-4">
//                         <Link
//                           to={`/supplier/product/${product._id}`}
//                           className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
//                         >
//                           View more
//                         </Link>
//                         {/* Remove from Favorites Button */}
//                         <button
//                           onClick={() => handleRemoveFromFavorites(product._id)}
//                           className="inline-block bg-red-500 text-white py-1.5 px-3 rounded-lg hover:bg-red-600 transition duration-300"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">
//             No favorite products found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ShowFavourites() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(100);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);
  const userId = user?.id;

  const handleRemoveFromFavorites = async (productId) => {
    try {
      await axios.post("/api/favourites/remove-from-favorites", { userId, productId });
      setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== productId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
      setError("Failed to remove from favorites");
    }
  };

  useEffect(() => {
    if (userId) {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(`/api/favourites/favorites/${userId}`);
          const favoriteIds = response.data.favorites.map((product) => product._id);
          setFavorites(favoriteIds);
        } catch (error) {
          console.error("Error fetching favorites:", error);
          setError("Failed to load favorites");
        } finally {
          setLoading(false);
        }
      };
      fetchFavorites();
    }
  }, [userId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/supplier/product/readAllProducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product._id)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-24 max-w-4xl mx-auto">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 pt-24 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 text-center mb-10">
          Favorite Products
        </h1>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-neutral-900">{product.name}</h2>
                      <p className="text-primary-600 font-medium mt-1">
                        Rs {product.price.toLocaleString()} per piece
                      </p>
                      <p className="text-neutral-600 text-sm mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {product.image && (
                      <div className="flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg border border-neutral-200"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    {/* <span className={`text-xs px-2 py-1 rounded-full ${
                      product.inStock 
                        ? "bg-secondary-100 text-secondary-800" 
                        : "bg-neutral-100 text-neutral-800"
                    }`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span> */}
                    
                    <div className="flex gap-2">
                      <Link
                        to={`/supplier/product/${product._id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleRemoveFromFavorites(product._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center max-w-2xl mx-auto">
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
              No favorite products found
            </h3>
            <p className="mt-1 text-neutral-500">
              You haven't added any products to your favorites yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}