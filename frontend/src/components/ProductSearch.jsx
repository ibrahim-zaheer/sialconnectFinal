// import React, { useState, useEffect } from "react";

// const ProductSearch = ({ products, onSearchResults }) => {
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // Filter the products based on search query
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   useEffect(() => {
//     // Apply search filter whenever searchQuery or products change
//     const filteredProducts = products.filter(product =>
//       product.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     onSearchResults(filteredProducts);
//   }, [searchQuery, products, onSearchResults]);

//   return (
//     <div className="relative w-1/3">
//       <input
//         type="text"
//         placeholder="Search products..."
//         value={searchQuery}
//         onChange={handleSearchChange}
//         className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
//       />
//       <svg className="absolute right-3 top-2.5 h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//       </svg>
//     </div>
//   );
// };

// export default ProductSearch;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ProductSearch = ({ onProductSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/supplier/product/readAllProducts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      setShowResults(false);
      return;
    }

    const filtered = products.filter((product) => {
      const matchesName = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDescription = product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesName || matchesDescription;
    });

    setFilteredProducts(filtered);
    setShowResults(searchQuery.trim() !== "");
  }, [searchQuery, products]);

  const handleProductClick = (product) => {
    setSearchQuery("");
    setShowResults(false);
    if (onProductSelect) {
      onProductSelect(product);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={() => setShowResults(true)}
        />
        <svg 
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div 
            className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
          >
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="flex items-center">
                    {product.image?.[0] && (
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded mr-3"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/48?text=No+Image";
                        }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{product.description}</p>
                      <p className="text-sm font-semibold text-blue-600">Rs {product.price?.toLocaleString() || 'N/A'}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="p-4 text-center text-gray-500"
                variants={itemVariants}
              >
                tyoe to search
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductSearch;