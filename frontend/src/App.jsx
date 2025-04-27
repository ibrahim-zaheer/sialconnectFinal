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
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "./redux/reducers/userSlice"; // Import Redux actions and selector
import {
  requestPermissionAndGetToken,
  listenForMessages,
  requestFCMToken,
  onMessageListener,
  onMessage,
  onMessageListening,
} from "./services/firebase"; // Import firebase functions
import { messaging } from "./services/firebase";

import { ToastContainer, toast } from "react-toastify";

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

import GetAllAuctionsPage from "./pages/bidding/GetAllAuctionsPage";

import ExporterAuctionsPage from "./pages/bidding/ExporterAuctionsPage";

import AuctionDetail from "./components/bidding/AuctionDetail";

import SupplierDetails from "./components/bidding/SupplierDetails";

import SupplierReviewsPage from "./pages/reviews/SupplierReviewsPage";

import FavouritePage from "./pages/favourites/FavouritePage";

import OfferPage from "./pages/offers/OfferPage";
import CreateOfferPage from "./pages/offers/CreateOfferPage";

import ExporterOfferPage from "./pages/offers/ExporterOfferPage";

import SupplierOfferPage from "./pages/offers/SupplierOfferPage";
import SupplierOrderPage from "./pages/orders/SupplierOrderPage";
import ExporterProducts from "./pages/Exporter/ExporterProducts";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import SupplierList from "./pages/admin/functions/SupplierList";
// import SupplierOrderPageByAdmin from "./pages/admin/functions/SupplierOrderPageByAdmin";
// import SupplierProductsPageByAdmin from "./pages/admin/functions/SupplierProductsPageByAdmin";
import AdminRoute from "./components/admin/AdminRoute";
import OrderPaymentListPage from "./pages/admin/functions/OrderPaymentListPage";

import UsersPage from "./pages/admin/functions/UsersPage";

import SupplierProductsPageByAdmin from "./pages/admin/functions/SupplierProductsPageByAdmin";

import ExporterOrdersPageByAdmin from "./pages/admin/functions/ExporterOrdersPageByAdmin";
import SupplierOrderPageByAdmin from "./pages/admin/functions/SupplierOrderPageByAdmin";
import AdminOrderDetailsPage from "./pages/orders/AdminOrderDetailsPage";

import ExporterOrderPage from "./pages/orders/ExporterOrderPage";

import SupplierOrderDetails from "./components/orders/supplier/SupplierOrderDetails";
import SupplierOrderDetailsPage from "./pages/orders/SupplierOrderDetailsPage";
import ExporterOrderDetailsPage from "./pages/orders/ExporterOrderDetailsPage";

import PaymentListPage from "./pages/payments/PaymentListPage";
import AdminOrderDetails from "./components/orders/admin/AdminOrderDetails";
import ExporterAuctions from "./components/bidding/ExporterAuctions";
import ExporterLayout from "./components/bidding/ExporterLayout";

const App = () => {
  return (
    <>
      <Main />
    </>
  );
};

const Main = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const hideNavbarRoutes = ["/signIn"];
  // const user = useSelector(selectUser);
  const user = useSelector((state) => state.user);

  const [fcmToken, setFcmToken] = useState(null);

  // useEffect(()=>{
  //   const fetchFCMToken = async ()=>{
  //     try{
  //      const token = await requestFCMToken();
  //      setFcmToken(token);
  //      console.log(fcmToken)
  //     } catch(err){
  //       console.error("Error getting token",err);
  //     }
  //   }
  //   fetchFCMToken();
  // })

  useEffect(() => {
    return toast(<div>Thank you</div>);
  }, []);

  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        const token = await requestFCMToken(user.id);
        setFcmToken(token);
        console.log("FCM Token:", token); // ✅ Logs the correct token
      } catch (err) {
        console.error("Error getting token", err);
      }
    };
    fetchFCMToken();
  }, []);

  // useEffect(() => {
  //   onMessageListening()
  //     .then((payload) => {
  //       console.log("🚀 Foreground Message Received:", payload);

  //       if (payload?.notification) {
  //         toast(
  //           <div>
  //             <strong>{payload.notification.title}</strong>
  //             <p>{payload.notification.body}</p>
  //           </div>,
  //           { position: "top-right" }
  //         );
  //       } else {
  //         console.log("❌ No notification payload received");
  //       }
  //     })
  //     .catch((err) => console.error("❌ Error in message listening", err));
  // }, []); // ✅ Runs only once when component mounts

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("🚀 Foreground Notification Received:", payload);

      if (payload?.notification) {
        toast(
          <div>
            <strong>{payload.notification.title}</strong>
            <p>{payload.notification.body}</p>
          </div>,
          { position: "top-right" }
        );
      } else {
        console.log("❌ No notification payload received");
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // useEffect(() => {
  //   if (user.id) {
  //     // If the user is logged in, request permission and get FCM token
  //     requestPermissionAndGetToken(user.id, dispatch); // Pass the userId and dispatch to update the token
  //     listenForMessages(); // Listen for incoming notifications

  //     console.log("user id has been requested");
  //   }
  // }, [user.id, dispatch]); // Only run when the user state changes

  return (
    <>
      {/* <ToastContainer/> */}
      {/* Render the Navbar unless the current path is in hideNavbarRoutes */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/products" element={<ProductViewing />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/roleSelection" element={<RoleSelection />} />
        <Route path="/Exporter" element={<ExporterPage />} />
        <Route path="/ExporterProducts" element={<ExporterProducts />} />
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

        <Route path="/getAllAuctions" element={<GetAllAuctionsPage />} />

        <Route
          path="/getAuctionsOfExporter"
          element={<ExporterAuctionsPage />}
        />

        <Route path="/bidding/:id" element={<AuctionDetail />} />

        <Route path="/bidding/supplier/:id" element={<SupplierDetails />} />
        {/* Reivews */}
        <Route path="/reviews/supplier/:id" element={<SupplierReviewsPage />} />

        {/* Favourites*/}
        <Route path="/favourites" element={<FavouritePage />} />

        {/* Offers*/}
        <Route path="/offers" element={<OfferPage />} />

        <Route path="/createOffers" element={<CreateOfferPage />} />

        <Route path="/myOffers" element={<ExporterOfferPage />} />

        <Route path="/mySupplierOffers" element={<SupplierOfferPage />} />

        <Route path="/mySupplierOrders" element={<SupplierOrderPage />} />

        <Route
          path="/supplier/order/:orderId"
          element={<SupplierOrderDetailsPage />}
        />
        <Route path="/supplier/payments" element={<PaymentListPage />} />

        {/* Exporter Orders */}
        <Route path="/myExporterOrders" element={<ExporterOrderPage />} />
        <Route
          path="/exporter/order/:orderId"
          element={<ExporterOrderDetailsPage />}
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/user"
          element={
            <AdminRoute>
              <UsersPage />
            </AdminRoute>
          }
        />
        {/* <Route path="/admin/user/supplier/:supplierId" element={<AdminRoute><SupplierProductsPageByAdmin /></AdminRoute>} /> */}
        <Route
          path="/admin/user/supplier/:supplierId"
          element={
            <AdminRoute>
              <SupplierList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/user/supplier/order/:supplierId"
          element={
            <AdminRoute>
              <SupplierOrderPageByAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/user/supplier/product/:supplierId"
          element={
            <AdminRoute>
              <SupplierProductsPageByAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/order/:orderId"
          element={<AdminOrderDetailsPage />}
        />

        <Route
          path="/admin/user/exporter/:exporterId"
          element={
            <AdminRoute>
              <ExporterOrdersPageByAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/user/order/payment"
          element={
            <AdminRoute>
              <OrderPaymentListPage />
            </AdminRoute>
          }
        />
        
        <Route 
  path="/exporter" 
  element={<ExporterLayout />}
>
  <Route index element={<ExporterAuctions />} />
  <Route path="auctions" element={<ExporterAuctions />} />
  <Route path="create-auction" element={<CreateAuction />} />
</Route>
      </Routes>
    </>
  );
};

export default App;
