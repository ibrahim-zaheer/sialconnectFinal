import React, { useState, useEffect } from "react";
import axios from "axios";

const SupplierReviews = ({ supplierId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch reviews by supplier ID
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/supplier/${supplierId}`);
        setReviews(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [supplierId]);

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

      {loading && <p className="text-gray-500">Loading reviews...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {reviews.length === 0 && !loading && !error && (
        <p className="text-gray-500">No reviews available for this supplier.</p>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-3">
              <img
                src={review.user.profilePicture || "https://via.placeholder.com/40"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{review.user.name}</p>
                <p className="text-sm text-gray-500">{review.productName}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="rating my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`mask mask-star ${
                    review.rating >= star ? "bg-yellow-400" : "bg-gray-300"
                  }`}
                ></span>
              ))}
            </div>

            <p className="text-gray-700 mt-2">{review.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierReviews;
