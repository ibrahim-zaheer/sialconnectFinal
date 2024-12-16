// // router.js
// import { createBrowserRouter, Route } from 'react-router-dom';
// import Auth from '../components/Auth';
// import HomePage from '../pages/homepage';
// import UserAuth from '../pages/userauthentication';
// import SupplierPage from '../pages/Supplier/SupplierPage';
// import ExporterPage from '../pages/Exporter/ExporterPage';
// import ProductDetails from '../components/Exporter/products/ProductDetails';
// import RoleSelection from '../components/roleSelection';
// import LandingPage from '../pages/landingPage';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <UserAuth />, // Root path renders the Auth component for login/register
//   },
//   {
//     path: '/home',
//     element: <HomePage />, // The home path renders HomePage after successful login
//   },
//   {
//     path: '/roleSelection',
//     element: <RoleSelection />, // The home path renders HomePage after successful login
//   },
//   {
//     path: '/Exporter',
//     element: <ExporterPage/>, // The home path renders HomePage after successful login
//   },
//   {
//     path: '/Supplier',
//     element: <SupplierPage/>, // The home path renders HomePage after successful login
//   },
//   {
//     path: '/supplier/product/:id',
//     element: <ProductDetails/>, 
//   },
//   {
//     path: '/landingPage',
//     element: <LandingPage/>, 
//   },

// ]);

// export default router;




import { createBrowserRouter } from 'react-router-dom';
import UserAuth from '../pages/userauthentication';
import HomePage from '../pages/homepage';
import RoleSelection from '../components/roleSelection';
import ExporterPage from '../pages/Exporter/ExporterPage';
import SupplierPage from '../pages/Supplier/SupplierPage';
import ProductDetails from '../components/Exporter/products/ProductDetails';
import LandingPage from '../pages/landingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserAuth />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/roleSelection',
    element: <RoleSelection />,
  },
  {
    path: '/Exporter',
    element: <ExporterPage />,
  },
  {
    path: '/Supplier',
    element: <SupplierPage />,
  },
  {
    path: '/supplier/product/:id',
    element: <ProductDetails />,
  },
  {
    path: '/landingPage',
    element: <LandingPage />,
  },
]);

export default router;
