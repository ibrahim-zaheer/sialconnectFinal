import React, { useState, useEffect } from "react";
import axios from "axios";

const AverageReviewBySupplier = ({ supplierId }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to calculate average rating
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0; // No reviews case
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1); // Round to 1 decimal
  };

  // Fetch reviews by supplier ID
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/supplier/${supplierId}`);
        const avgRating = calculateAverageRating(response.data);
        setAverageRating(avgRating); // Update local state
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [supplierId]);

  return (
    <div className="flex items-center gap-2">
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          {/* Star Rating Display */}
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={star <= averageRating ? "gold" : "lightgray"}
                className="w-5 h-5"
              >
                <path d="M12 17.3l6.18 3.73-1.64-7.03 5.46-4.73-7.15-.61L12 2 9.15 8.66l-7.15.61 5.46 4.73-1.64 7.03L12 17.3z" />
              </svg>
            ))}
          </div>
          <p className="font-semibold text-gray-700">{averageRating} ⭐</p>
        </>
      )}
    </div>
  );
};

export default AverageReviewBySupplier;
