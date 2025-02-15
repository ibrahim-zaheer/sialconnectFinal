import React from "react";
import { useParams } from "react-router-dom"; // Import useParams
import SupplierReviews from "../../components/reviews/ReviewsBySupplier";

const SupplierReviewsPage = () => {
  const { Id } = useParams(); // Get user ID from URL

  return (
    <div>
      <SupplierReviews supplierId={Id} />
    </div>
  );
};

export default SupplierReviewsPage;
