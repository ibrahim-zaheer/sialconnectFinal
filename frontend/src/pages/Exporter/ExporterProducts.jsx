import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import CategoryDropdown from "../../components/Supplier/products/component/CategoryDropdown";
import FavoriteToggle from "../../components/favourites/FavoriteToggle";
import ProductSearch from "../../components/ProductSearch";
import RecommendedProducts from "../../components/Exporter/products/RecommendedProducts";
import { fetchRecommendedProducts } from "../../components/Exporter/products/hooks/fetchRecommendedProducts";
import { ProductPrice } from "./components/ProductPrice";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const ExporterProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  const location = useLocation();
  const supplierNameFromState = location.state?.supplierName || "";

  // Filter states
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedCities, setSelectedCities] = useState([]);
  const [supplierName, setSupplierName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // Available options for filters
  const cities = [
    "Sialkot",
    "Faisalabad",
    "Karachi",
    "Lahore",
    "Daska",
    "Wazirabad",
    "KPK",
  ];

  const user = useSelector((state) => state.user);
  const userId = user?.id;
  const role = user.role;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2,
      },
    },
  };

  const chipVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const fetchAllProducts = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "/api/supplier/product/readAllProducts",
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const visibleProducts = response.data.filter((product) => product.enable_view);
      setProducts(visibleProducts);
      setFilteredProducts(visibleProducts);
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

  useEffect(() => {
    if (userId) {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(
            `/api/favourites/favorites/id/${userId}`
          );
          setFavorites(response.data.favorites);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchFavorites();
    }
  }, [userId]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const recommendations = await fetchRecommendedProducts();
      console.log(recommendations);
      setRecommendedProducts(recommendations);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (supplierNameFromState && products.length > 0) {
      setSupplierName(supplierNameFromState);
      applyFilters(
        searchQuery,
        priceRange,
        selectedCities,
        supplierNameFromState,
        selectedCategory
      );
    }
  }, [supplierNameFromState, products]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFilters(
      query,
      priceRange,
      selectedCities,
      supplierName,
      selectedCategory
    );
  };

  const handlePriceChange = (e) => {
    const price = parseInt(e.target.value);
    setPriceRange(price);
    applyFilters(
      searchQuery,
      price,
      selectedCities,
      supplierName,
      selectedCategory
    );
  };

  const toggleCityFilter = (city) => {
    const newSelectedCities = selectedCities.includes(city)
      ? selectedCities.filter((c) => c !== city)
      : [...selectedCities, city];
    setSelectedCities(newSelectedCities);
    applyFilters(
      searchQuery,
      priceRange,
      newSelectedCities,
      supplierName,
      selectedCategory
    );
  };

  const handleSupplierNameChange = (e) => {
    const name = e.target.value;
    setSupplierName(name);
    applyFilters(
      searchQuery,
      priceRange,
      selectedCities,
      name,
      selectedCategory
    );
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    applyFilters(
      searchQuery,
      priceRange,
      selectedCities,
      supplierName,
      category
    );
  };

  const applyFilters = (
    search = searchQuery,
    price = priceRange,
    cities = selectedCities,
    supplier = supplierName,
    category = selectedCategory
  ) => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase());
      const isWithinPrice = product.price <= price;

      // Update this line to filter based on supplier's city
      const matchesCity =
        cities.length === 0 ||
        (product.supplier?.city && cities.includes(product.supplier.city));

      // Filter based on supplier's name
      const matchesSupplier =
        !supplier ||
        (product.supplier?.name &&
          product.supplier.name.toLowerCase().includes(supplier.toLowerCase()));

      const matchesCategory =
        !category ||
        (product.category &&
          product.category.toLowerCase() === category.toLowerCase());

      return (
        matchesSearch &&
        isWithinPrice &&
        matchesCity && // Use the updated city condition
        matchesSupplier &&
        matchesCategory
      );
    });

    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setPriceRange(10000);
    setSelectedCities([]);
    setSupplierName("");
    setSelectedCategory("");
    setSearchQuery("");
    setFilteredProducts(products);
  };

  return (
    <div className="flex min-h-screen bg-neutral-100 mt-16">
      {/* Sidebar Filters */}
      <motion.div
        className="w-64 bg-white shadow-md fixed h-full overflow-y-auto z-10"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <motion.div
          className="p-4 border-b border-neutral-200"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold text-primary-800">Filters</h2>
        </motion.div>

        {/* Price Filter */}
        <motion.div
          className="p-4 pt-3 border-b border-neutral-200"
          variants={itemVariants}
        >
          <h3 className="text-md font-medium text-neutral-700 mb-2">
            Price Range
          </h3>
          <div className="w-full">
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
              step="50"
              onChange={handlePriceChange}
            />
            <div className="w-full flex justify-between text-neutral-600 text-sm mt-1">
              <span>Rs 0</span>
              <span>Rs {priceRange.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        {/* City Filter */}
        <motion.div
          className="p-4 pt-3 border-b border-neutral-200"
          variants={itemVariants}
        >
          <h3 className="text-md font-medium text-neutral-700 mb-2">Cities</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {cities.map((city) => (
              <div key={city} className="flex items-center">
                <input
                  type="checkbox"
                  id={`city-${city}`}
                  checked={selectedCities.includes(city)}
                  onChange={() => toggleCityFilter(city)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label
                  htmlFor={`city-${city}`}
                  className="ml-2 text-sm text-neutral-700"
                >
                  {city}
                </label>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Supplier Filter */}
        <motion.div
          className="p-4 pt-3 border-b border-neutral-200"
          variants={itemVariants}
        >
          <h3 className="text-md font-medium text-neutral-700 mb-2">
            Supplier Name
          </h3>
          <input
            type="text"
            placeholder="Search supplier..."
            value={supplierName}
            onChange={handleSupplierNameChange}
            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="p-4 pt-3 border-b border-neutral-200"
          variants={itemVariants}
        >
          <CategoryDropdown
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
          />
        </motion.div>

        {/* Reset Button */}
        <motion.div className="p-4" variants={itemVariants}>
          <button
            onClick={resetFilters}
            className="w-full bg-neutral-200 hover:bg-neutral-300 text-neutral-800 py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            Reset All Filters
          </button>
        </motion.div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-6">
        {/* Header and Search */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-neutral-900">All Products</h1>

          <div className="relative w-full md:w-1/3">
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
        </motion.div>

        {/* Status Messages */}
        <AnimatePresence>
          {message && (
            <motion.div
              className={`p-4 mb-6 rounded ${
                message.includes("Failed")
                  ? "bg-error-100 border-l-4 border-error-500 text-error-700"
                  : "bg-success-100 border-l-4 border-success-500 text-success-700"
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p>{message}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters */}
        <AnimatePresence>
          {(selectedCities.length > 0 ||
            supplierName ||
            selectedCategory ||
            priceRange < 10000) && (
            <motion.div
              className="mb-6 bg-primary-50 p-4 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm font-medium text-primary-800">
                  Active filters:
                </span>

                <AnimatePresence>
                  {selectedCities.length > 0 && (
                    <motion.span
                      className="inline-flex items-center bg-primary-100 text-primary-800 text-xs px-3 py-1 rounded-full"
                      variants={chipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      Cities: {selectedCities.join(", ")}
                      <button
                        onClick={() => {
                          setSelectedCities([]);
                          applyFilters(
                            searchQuery,
                            priceRange,
                            [],
                            supplierName,
                            selectedCategory
                          );
                        }}
                        className="ml-1 text-primary-600 hover:text-primary-800"
                      >
                        ×
                      </button>
                    </motion.span>
                  )}

                  {supplierName && (
                    <motion.span
                      className="inline-flex items-center bg-primary-100 text-primary-800 text-xs px-3 py-1 rounded-full"
                      variants={chipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      Supplier: {supplierName}
                      <button
                        onClick={() => {
                          setSupplierName("");
                          applyFilters(
                            searchQuery,
                            priceRange,
                            selectedCities,
                            "",
                            selectedCategory
                          );
                        }}
                        className="ml-1 text-primary-600 hover:text-primary-800"
                      >
                        ×
                      </button>
                    </motion.span>
                  )}

                  {selectedCategory && (
                    <motion.span
                      className="inline-flex items-center bg-primary-100 text-primary-800 text-xs px-3 py-1 rounded-full"
                      variants={chipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      Category: {selectedCategory}
                      <button
                        onClick={() => {
                          setSelectedCategory("");
                          applyFilters(
                            searchQuery,
                            priceRange,
                            selectedCities,
                            supplierName,
                            ""
                          );
                        }}
                        className="ml-1 text-primary-600 hover:text-primary-800"
                      >
                        ×
                      </button>
                    </motion.span>
                  )}

                  {priceRange < 10000 && (
                    <motion.span
                      className="inline-flex items-center bg-primary-100 text-primary-800 text-xs px-3 py-1 rounded-full"
                      variants={chipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      Max Price: Rs {priceRange.toLocaleString()}
                      <button
                        onClick={() => {
                          setPriceRange(10000);
                          applyFilters(
                            searchQuery,
                            10000,
                            selectedCities,
                            supplierName,
                            selectedCategory
                          );
                        }}
                        className="ml-1 text-primary-600 hover:text-primary-800"
                      >
                        ×
                      </button>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product) => {
              const isRecommended = recommendedProducts.some(
                (recommendedProduct) => {
                  console.log(
                    "Checking if product._id matches recommendedProduct._id"
                  );
                  console.log("Product _id:", product._id);
                  console.log(
                    "Recommended Product _id:",
                    recommendedProduct._id
                  );
                  if (recommendedProduct._id === product._id) {
                    console.log("it is matching");
                  }
                  return recommendedProduct._id === product._id;
                }
              );

              return (
                <motion.div
                  key={product._id}
                  className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-6">
                    {/* Display "Recommended" tag if applicable */}

                    {/* <div className="p-6"> */}
                    {/* Display "Recommended" tag if applicable */}
                    {/* {isRecommended && (
                          <span className="absolute top-2 left-2 bg-primary-600 text-black text-xs px-2 py-1 rounded-full">
                            Recommended
                          </span>
                        )} */}
                    {/* Rest of the product details */}
                    {/* </div> */}

                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-semibold text-neutral-900 line-clamp-2">
                          {product.name}
                        </h2>
                        {/* <p className="text-primary-600 font-medium mt-1">
                          Rs {product.price?.toLocaleString() || "N/A"} per
                          piece
                        </p> */}
                        {/* {product.discounts && product.discounts.length > 0 && product.discounts[0].discountedPrice && (
  <p className="text-primary-600 font-medium mt-1">
    Rs {product.discounts[0].discountedPrice} per piece
  </p>
)} */}

                        <ProductPrice product={product} user={user} />
                      </div>
                      {role === "exporter" && (
                        <FavoriteToggle
                          productId={product._id}
                          favorites={favorites}
                          setFavorites={setFavorites}
                          userId={userId}
                        />
                      )}
                    </div>

                    <div className="mt-4">
                      <p className="text-neutral-600 text-sm line-clamp-3">
                        {product.description.length > 100
                          ? `${product.description.substring(0, 100)}...`
                          : product.description}
                      </p>
                      {product.category && (
                        <span className="inline-block mt-2 bg-neutral-100 text-neutral-800 text-xs px-2 py-1 rounded">
                          {product.category}
                        </span>
                      )}
                    </div>

                    {product.image && (
                      <div className="mt-4 flex justify-center overflow-hidden">
                        <img
                          src={
                            product.image?.[0] ||
                            "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600"
                          }
                          alt={product.name}
                          className="w-40 h-40 object-cover rounded-md"
                        />
                      </div>
                    )}

                    <Link
                      to={`/supplier/product/${product._id}`}
                      className="text-primary-600 hover:text-white hover:bg-primary-800 duration-300 transition-all font-medium text-sm border-2 rounded-lg border-primary-600 p-2 mt-5 flex justify-center items-center"
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
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            className="bg-white rounded-lg shadow p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
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
              {searchQuery ||
              priceRange < 10000 ||
              selectedCities.length > 0 ||
              supplierName ||
              selectedCategory
                ? "No products match your filter criteria"
                : "No products available"}
            </p>
            {(searchQuery ||
              priceRange < 10000 ||
              selectedCities.length > 0 ||
              supplierName ||
              selectedCategory) && (
              <button
                onClick={resetFilters}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Reset Filters
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExporterProducts;
