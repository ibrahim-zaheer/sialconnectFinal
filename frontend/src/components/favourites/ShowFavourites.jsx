import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ShowFavourites() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(100); // Default max value
  const [favorites, setFavorites] = useState([]); // Store user's favorite product IDs

  // for accessing the user profile id
  const user = useSelector((state) => state.user);
  const userId = user?.id;

  const handleRemoveFromFavorites = (productId) => {
    axios
      .post("/api/favourites/remove-from-favorites", { userId, productId })
      .then((response) => {
        // Update the favorites state by removing the productId
        setFavorites((prevFavorites) =>
          prevFavorites.filter((id) => id !== productId)
        );
      })
      .catch((error) => {
        console.error("Error removing from favorites:", error);
      });
  };
  // Fetch user's favorites
  useEffect(() => {
    if (userId) {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(
            `/api/favourites/favorites/${userId}`
          );

          // Extract only the product IDs from the response
          const favoriteIds = response.data.favorites.map(
            (product) => product._id
          );
          // setFavorites(response.data.favorites);
          setFavorites(favoriteIds);
          console.log("favourites found are: " + response.data.favorites);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchFavorites();
    }
  }, [userId]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "/api/supplier/product/readAllProducts"
        ); // API endpoint for all products
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products to show only favorites
  const favoriteProducts = products.filter((product) =>
    favorites.includes(product._id)
  );

  return (
    <div className="mt-24 text-[#1b263b]">
      {/* Search & Filter UI */}
      <div className="flex flex-col items-center mt-4">
        {/* Search Input */}
      </div>

      <h1 className="text-center text-3xl font-semibold my-10">
        Favorite Products
      </h1>

      {/* Display Favorite Products */}
      <div className="flex flex-wrap justify-center items-center gap-8 mt-4 bg-gray-100 rounded-lg w-[80vw] mx-auto p-8 my-5">
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map((product) => (
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
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-col items-end flex-1">
                  {/* <img
                    src={product.image}
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

                  <div className="mt-4">
                    <Link
                      to={`/supplier/product/${product._id}`}
                      className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      View more
                    </Link>
                    {/* Remove from Favorites Button */}
                    <button
                      onClick={() => handleRemoveFromFavorites(product._id)}
                      className="inline-block bg-red-500 text-white py-1.5 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <p className="text-center text-gray-500">
              No favorite products found.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
