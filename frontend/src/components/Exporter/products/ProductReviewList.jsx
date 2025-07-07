import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductReviewList = ({ productId, limit = 1 }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) return;

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/product/${productId}?reviewerRole=exporter`);
        const allReviews = response.data.reviews || [];
        setReviews(allReviews.slice(0, limit));
      } catch (err) {
        setError("Failed to load reviews.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, limit]);

  if (loading) return null; // 👈 Don't show anything while loading
  if (error) return null;   // 👈 Don't show anything on error
  if (reviews.length === 0) return null; // 👈 Hide component if no reviews

  return (
    <div className="space-y-4 mt-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="border p-4 rounded-lg shadow-sm bg-white"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">{review.user?.name || "Anonymous"}</div>
            <div className="text-yellow-500">
              {"★".repeat(review.rating)}{" "}
              <span className="text-gray-400">
                {"☆".repeat(5 - review.rating)}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-1">
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
          <p className="text-gray-800">{review.reviewText}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviewList;
