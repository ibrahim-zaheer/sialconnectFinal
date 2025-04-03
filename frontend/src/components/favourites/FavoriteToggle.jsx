// components/FavoriteToggle.js
import React from "react";
import axios from "axios";

const FavoriteToggle = ({ productId, favorites, setFavorites, userId }) => {
  const isFavorite = favorites.includes(productId.toString());

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.post("/api/favourites/remove-from-favorites", {
          userId,
          productId,
        });
        setFavorites((prev) =>
          prev.filter((id) => id.toString() !== productId.toString())
        );
      } else {
        await axios.post("/api/favourites/add-to-favorites", {
          userId,
          productId,
        });
        setFavorites((prev) => [...prev, productId.toString()]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <button onClick={toggleFavorite} className="btn btn-ghost btn-sm p-0">
      {isFavorite ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18.35l-1.45-1.32C3.4 12.36 0 9.28 0 5.5 0 2.42 2.42 0 5.5 0c1.74 0 3.41.81 4.5 2.09C10.09.81 11.76 0 13.5 0 16.58 0 19 2.42 19 5.5c0 3.78-3.4 6.86-8.55 11.54L10 18.35z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  );
};

export default FavoriteToggle;
