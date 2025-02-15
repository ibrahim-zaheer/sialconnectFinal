import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAverageRating } from "../../redux/reducers/averageRatingSlice";

const SupplierReviews = ({ supplierId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const dispatch = useDispatch();
  const averageRating = useSelector((state) => state.averageRating.value);

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
        setReviews(response.data);

        // Calculate and dispatch the average rating
        const avgRating = calculateAverageRating(response.data);
        dispatch(setAverageRating(avgRating)); // Update Redux store
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [supplierId]);

    // Log the current average rating
    useEffect(() => {
      console.log("Current Average Rating from Redux:", averageRating);
    }, [averageRating]);

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
                src={
                  review.user.profilePicture || "https://via.placeholder.com/40"
                }
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{review.user.name}</p>
                <p className="text-sm text-gray-500">{review.productName}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={review.rating >= star ? "gold" : "lightgray"}
                  className="w-5 h-5"
                >
                  <path d="M12 17.3l6.18 3.73-1.64-7.03 5.46-4.73-7.15-.61L12 2 9.15 8.66l-7.15.61 5.46 4.73-1.64 7.03L12 17.3z" />
                </svg>
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
