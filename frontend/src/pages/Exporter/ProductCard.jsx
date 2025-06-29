import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FavoriteToggle from "../../components/favourites/FavoriteToggle";

const ProductCard = ({ product, role, favorites, setFavorites, userId }) => {
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

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          {product.image && (
            <div className="mt-4 flex justify-center overflow-hidden">
              <img
                src={
                  product.image?.[0] ||
                  "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
                alt={product.name}
                className="w-40 h-40 object-cover rounded-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600";
                }}
              />
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 line-clamp-2">
              {product.name}
            </h2>
            <p className="text-primary-600 font-medium mt-1">
              Rs {product.price?.toLocaleString() || "N/A"} per piece
            </p>
          </div>
        </div>

        {product.supplierName && (
          <p className="text-sm text-neutral-600 mt-1">
            <span className="font-medium">Supplier:</span>{" "}
            {product.supplierName}
          </p>
        )}
        {product.supplier?.name && (
          <p className="text-sm text-neutral-600 mt-1">
            <span className="font-medium">Supplier:</span>{" "}
            {product.supplier.name}
          </p>
        )}
        {product.supplier?.city && (
          <p className="text-sm text-neutral-600">
            <span className="font-medium">Location:</span>{" "}
            {product.supplier.city}
          </p>
        )}
        {product.city && (
          <p className="text-sm text-neutral-600">
            <span className="font-medium">Location:</span> {product.city}
          </p>
        )}

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
};

export default ProductCard;
