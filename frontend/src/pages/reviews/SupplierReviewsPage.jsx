import React from "react";
import { useParams } from "react-router-dom"; // Import useParams
import SupplierReviews from "../../components/reviews/ReviewsBySupplier";
import BackButton from "../../components/BackButton";

const SupplierReviewsPage = () => {
  const { id } = useParams(); // Ensure case matches route definition


  return (
    <div>
      <div className="pt-20"></div>
      {/* <BackButton/> */}
      <BackButton className="mb-4 ml-14 bg-primary-800 text-white hover:bg-primary-600"  />
      <SupplierReviews supplierId={id} />
    </div>
  );
};

export default SupplierReviewsPage;
