// import React from 'react';
// import { RouterProvider } from 'react-router-dom';
// import router from '../src/routes/router'; // Import the router configuration
// import { useTranslation, Trans } from 'react-i18next';
// import LanguageSelector from './components/language/language-selector';

// function App() {
//   const { t } = useTranslation();

//   const { line1, line2 } = t("description", {
//     channel: "IbrahimZaheer",
//   });

//   return (
//     <div className="App">
//       {/* Navbar inside the router context */}
//       <RouterProvider router={router}>

//         <LanguageSelector />
//         <h1>{t("greeting")}</h1>

//         <span>
//           <Trans
//             i18nKey={line1}
//             values={{
//               channel: "RoadsideCoder",
//             }}
//             components={{ 1: <b /> }}
//           />
//         </span>
//       </RouterProvider>
//     </div>
//   );
// }

// export default App;

// // import React from 'react';
// // import { useTranslation, Trans } from 'react-i18next';
// // import LanguageSelector from './components/language/language-selector';
// // import Navbar from './components/navbar';
// // import { Outlet } from 'react-router-dom'; // To render nested routes if needed

// // function App() {
// //   const { t } = useTranslation();

// //   const { line1 } = t("description", {
// //     channel: "IbrahimZaheer",
// //   });

// //   return (
// //     <div className="App">

// //       <Navbar />
// //       <LanguageSelector />

// //       {/* Main content */}
// //       <h1>{t("greeting")}</h1>
// //       <span>
// //         <Trans
// //           i18nKey="description.line1"
// //           values={{
// //             channel: "RoadsideCoder",
// //           }}
// //           components={{ 1: <b /> }}
// //         />
// //       </span>

// //       <Outlet />
// //     </div>
// //   );
// // }

// // export default App;

import React from "react";
import { Routes, Router, Route, useLocation } from "react-router-dom";
import Navbar from "./components/NavigationBar";
import UserAuth from "./pages/userauthentication";
import HomePage from "./pages/homepage";
import RoleSelection from "./components/roleSelection";
import ExporterPage from "./pages/Exporter/ExporterPage";
import SupplierPage from "./pages/Supplier/SupplierPage";
import ProductDetails from "./components/Exporter/products/ProductDetails";
import LandingPage from "./pages/landingPage";
import ProfilePage from "./pages/profilepage";

import LandingPage2 from "./pages/landingPage2";
import ProductViewing from "./pages/ProductViewing";

import ChatPage from "./pages/chatPage";

import VerifyEmail from "./components/verifyEmail";

import VerifyOTP from "./components/otp/verify-otp";


import SupplierProductsPage from "./pages/Supplier/SupplierProductsPage";

import CreateAuction from "./pages/bidding/createAuction";

import GetAllAuctionsPage from "./pages/bidding/GetAllAuctionsPage"

import ExporterAuctionsPage from "./pages/bidding/ExporterAuctionsPage"


import AuctionDetail from "./components/bidding/AuctionDetail";

const App = () => {
  return (
    <>
      <Main />
    </>
  );
};

const Main = () => {
  const location = useLocation();

  const hideNavbarRoutes = ["/signIn"];

  return (
    <>
      {/* Render the Navbar unless the current path is in hideNavbarRoutes */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/products" element={<ProductViewing />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/roleSelection" element={<RoleSelection />} />
        <Route path="/Exporter" element={<ExporterPage />} />
        <Route path="/Supplier" element={<SupplierPage />} />
        <Route path="/signIn" element={<UserAuth />} />
        <Route path="/supplier/product/:id" element={<ProductDetails />} />
        
        <Route path="/View" element={<ProductViewing />} />

        <Route path="/VerifyEmail" element={<VerifyEmail />} />

        <Route path="/VerifyOTP" element={<VerifyOTP />} />

        {/* Supplier Part */}

        <Route path="/SupplierProducts" element={<SupplierProductsPage />} />

{/* For Chat */}
        <Route path="/chat" element={<ChatPage />} />


{/* Bidding */}
        <Route path="/createAuction" element={<CreateAuction />} />

        <Route path="/getAllAuctions" element={<GetAllAuctionsPage  />} />

        <Route path="/getAuctionsOfExporter" element={<ExporterAuctionsPage  />} />

        <Route path="/bidding/:id" element={<AuctionDetail />} />

        {/* <Route path="/bidding/:id" element={<AuctionDetail />} /> */}

      </Routes>
    </>
  );
};

export default App;
