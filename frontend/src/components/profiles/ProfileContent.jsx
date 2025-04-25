import React from "react";
import { motion } from "framer-motion";
import ProfileInfo from "./ProfileInfo";
import SupplierOfferPage from "../../pages/offers/SupplierOfferPage";
import PaymentListPage from "../../pages/payments/PaymentListPage";
// import ReviewsSection from "../reviews/ReviewsBySupplier";
import SupplierReviews from "../reviews/ReviewsBySupplier";

const ProfileContent = ({ activeTab, user }) => {
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileInfo user={user} />;
      case "offers":
        return <SupplierOfferPage/>;
      case "payments":
        return <PaymentListPage/>;
      case "reviews":
        // return <ReviewsSection user={user} />;
        return <SupplierReviews supplierId={user.id} />;
      default:
        return <ProfileInfo user={user} />;
    }
  };

  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden"
    >
      {renderContent()}
    </motion.div>
  );
};

export default ProfileContent;