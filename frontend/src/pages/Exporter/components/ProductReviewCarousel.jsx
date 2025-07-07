import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductReviewCarousel = ({ productId, limit = 3 }) => {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/reviews/product/${productId}`);
        const visibleReviews = res.data.data.filter((r) => r.status === "visible");
        setReviews(visibleReviews.slice(0, limit));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, limit]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (loading) return <p>Loading reviews...</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  const review = reviews[current];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Product Review</h3>
      <div style={styles.card}>
        <p style={styles.rating}>⭐ {review.rating} / 5</p>
        <p style={styles.text}>{review.reviewText}</p>
        <p style={styles.user}>By: {review.user?.name || "Anonymous"}</p>
        <div style={styles.controls}>
          <button onClick={handlePrev} disabled={reviews.length <= 1}>⟨</button>
          <button onClick={handleNext} disabled={reviews.length <= 1}>⟩</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "400px", margin: "1rem auto", textAlign: "center" },
  title: { fontWeight: "bold", marginBottom: "1rem" },
  card: {
    border: "1px solid #ddd",
    padding: "1rem",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  rating: { fontSize: "1.2rem", color: "#f39c12", marginBottom: "0.5rem" },
  text: { fontStyle: "italic", marginBottom: "0.5rem" },
  user: { fontSize: "0.9rem", color: "#555" },
  controls: { marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem" },
};

export default ProductReviewCarousel;
