import React from "react";
import { useParams } from "react-router-dom"; // Import useParams
import SupplierReviews from "../../components/reviews/ReviewsBySupplier";
import BackButton from "../../components/BackButton";

const SupplierReviewsPage = () => {
  const { id } = useParams(); // Ensure case matches route definition


  return (
    <div>
      <div className="pt-20"></div>
      <BackButton/>
      <SupplierReviews supplierId={id} />
    </div>
  );
};

export default SupplierReviewsPage;
