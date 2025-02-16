import React from "react";
import { useParams } from "react-router-dom"; // Import useParams
import SupplierReviews from "../../components/reviews/ReviewsBySupplier";

const SupplierReviewsPage = () => {
  const { id } = useParams(); // Ensure case matches route definition


  return (
    <div>
      <SupplierReviews supplierId={id} />
    </div>
  );
};

export default SupplierReviewsPage;
