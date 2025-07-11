// import React from "react";
// import { motion } from "framer-motion";
// import ProfileInfo from "./ProfileInfo";
// import SupplierOfferPage from "../../pages/offers/SupplierOfferPage";
// import ExporterOfferPage from "../../pages/offers/ExporterOfferPage";
// import PaymentListPage from "../../pages/payments/PaymentListPage";
// // import ReviewsSection from "../reviews/ReviewsBySupplier";
// import SupplierReviews from "../reviews/ReviewsBySupplier";
// import { useSelector } from "react-redux";

// const ProfileContent = ({ activeTab, user }) => {
//   const currentUser = useSelector((state) => state.user);
//   const userRole = currentUser?.role || user?.role;
//   const renderContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return <ProfileInfo user={user} />;
//       // case "offers":
//       //   return <SupplierOfferPage/>;
//       case "offers":
//         // Show different offer pages based on role
//         return userRole === "exporter" ? (
//           <ExporterOfferPage />
//         ) : (
//           <SupplierOfferPage />
//         );
//       case "payments":
//         return <PaymentListPage/>;
//       case "reviews":
//         // return <ReviewsSection user={user} />;
//         return <SupplierReviews supplierId={user.id} />;
//       default:
//         return <ProfileInfo user={user} />;
//     }
//   };

//   return (
//     <motion.div
//       key={activeTab}
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="bg-white rounded-2xl shadow-sm overflow-hidden"
//     >
//       {renderContent()}
//     </motion.div>
//   );
// };

// export default ProfileContent;

// import React from "react";
// import { motion } from "framer-motion";
// import ProfileInfo from "./ProfileInfo";
// import SupplierOfferPage from "../../pages/offers/SupplierOfferPage";
// import ExporterOfferPage from "../../pages/offers/ExporterOfferPage";
// import PaymentListPage from "../../pages/payments/PaymentListPage";
// import SupplierReviews from "../reviews/ReviewsBySupplier";
// import { useSelector } from "react-redux";

// const ProfileContent = ({ activeTab, user }) => {
//   const currentUser = useSelector((state) => state.user);
//   const userRole = currentUser?.role || user?.role;

//   const renderContent = () => {
//     // For exporters, only show profile and offers tabs
//     if (userRole === "exporter" && (activeTab === "payments" || activeTab === "reviews")) {
//       return null;
//     }

//     switch (activeTab) {
//       case "profile":
//         return <ProfileInfo user={user} />;
//       case "offers":
//         return userRole === "exporter" ? (
//           <ExporterOfferPage />
//         ) : (
//           <SupplierOfferPage />
//         );
//       case "payments":
//         return <PaymentListPage />;
//       case "reviews":
//         return <SupplierReviews supplierId={user.id} />;
//       default:
//         return <ProfileInfo user={user} />;
//     }
//   };

//   return (
//     <motion.div
//       key={activeTab}
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="bg-white rounded-2xl shadow-sm overflow-hidden"
//     >
//       {renderContent()}
//     </motion.div>
//   );
// };

// export default ProfileContent;

import React from "react";
import { motion } from "framer-motion";
import ProfileInfo from "./ProfileInfo";
import SupplierOfferPage from "../../pages/offers/SupplierOfferPage";
import ExporterOfferPage from "../../pages/offers/ExporterOfferPage";
import PaymentListPage from "../../pages/payments/PaymentListPage";
import SupplierReviews from "../reviews/ReviewsBySupplier";
import ExporterReviews from "../reviews/ReviewsByExporter";
import { useSelector } from "react-redux";
import { useTranslation, Trans } from "react-i18next";

const ProfileContent = ({ activeTab, user }) => {
  const { t, ready } = useTranslation("profile");
  const currentUser = useSelector((state) => state.user);
  const userRole = currentUser?.role || user?.role;

  if (!ready) return <div>{t("loading", { defaultValue: "Loading..." })}</div>;

  const renderContent = () => {
    // For exporters, only show profile and offers tabs
    if (userRole === "exporter" && activeTab === "payments") {
      return null;
    }

    switch (activeTab) {
      case "profile":
        return <ProfileInfo user={user} />;
      case "offers":
        return userRole === "exporter" ? (
          <ExporterOfferPage />
        ) : (
          <SupplierOfferPage />
        );
      case "payments":
        return <PaymentListPage />;
      case "reviews":
        return userRole === "exporter" ? (
          <ExporterReviews exporterId={user.id} />
        ) : (
          <SupplierReviews supplierId={user.id} />
        );
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
