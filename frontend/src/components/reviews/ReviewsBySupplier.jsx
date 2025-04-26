import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setAverageRating } from "../../redux/reducers/averageRatingSlice";

const SupplierReviews = ({ supplierId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const averageRating = useSelector((state) => state.averageRating.value);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/supplier/${supplierId}`);
        setReviews(response.data);
        const avgRating = calculateAverageRating(response.data);
        dispatch(setAverageRating(avgRating));
      } catch (err) {
        setError(err.response?.data?.message || "We couldn't load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [supplierId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <h2 className="text-2xl font-bold text-primary-800 mb-4 md:mb-0">Customer Feedback</h2>
          {averageRating > 0 && (
            <div className="flex items-center bg-primary-50 px-4 py-2 rounded-full">
              <span className="text-primary-700 font-bold mr-2">{averageRating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-accent-500' : 'text-neutral-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.202c.969 0 1.371 1.24.588 1.81l-3.404 2.473a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.404-2.473a1 1 0 00-1.176 0l-3.404 2.473c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.215 9.401c-.783-.57-.38-1.81.588-1.81h4.202a1 1 0 00.95-.69l1.286-3.974z"/>
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-neutral-600">Average Rating</span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-neutral-50 p-6 rounded-xl animate-pulse h-64"></div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-error-50 border-l-4 border-error-500 p-4 rounded">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-error-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-error-700">{error}</p>
            </div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-surface rounded-xl shadow-sm p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-neutral-900">No reviews yet</h3>
            <p className="mt-1 text-neutral-500">Customers haven't left any reviews yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-surface rounded-xl shadow-sm border border-neutral-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review.user.profilePicture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                      alt={review.user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary-100"
                    />
                    <div>
                      <h4 className="font-medium text-primary-800">{review.user.name}</h4>
                      <p className="text-sm text-neutral-600">{review.productName}</p>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${review.rating >= star ? 'text-accent-500' : 'text-neutral-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.202c.969 0 1.371 1.24.588 1.81l-3.404 2.473a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.404-2.473a1 1 0 00-1.176 0l-3.404 2.473c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.215 9.401c-.783-.57-.38-1.81.588-1.81h4.202a1 1 0 00.95-.69l1.286-3.974z"/>
                      </svg>
                    ))}
                  </div>

                  <p className="text-neutral-700 mb-4">{review.reviewText}</p>
                  
                  <div className="flex items-center text-sm text-neutral-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(review.createdAt)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SupplierReviews;