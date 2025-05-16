


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import "../assets/css/navbar.css"; // Your existing CSS (to maintain styling)
// import Sial from "../assets/images/sial3.png"; // Logo image
// import { useTranslation } from "react-i18next";

// const Navbar = () => {
//   const user = useSelector((state) => state.user);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { t } = useTranslation();

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <div className="w-full fixed top-0 bg-[#1b263b] shadow-md z-50">
//       <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/home" className="flex items-center" onClick={closeMobileMenu}>
//               <img 
//                 src={Sial} 
//                 className="h-10 w-auto" 
//                 alt="SialConnect Logo"
//               />
//               <span className="ml-2 text-white font-bold text-xl hidden sm:inline">
//                 SialConnect
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             <div className="flex space-x-4">
//               {/* Common Links */}
//               <Link to="/home" className="text-white hover:text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" onClick={closeMobileMenu}>
//                 {t("Home")}
//               </Link>
//               {
//                 user.role !== "supplier" && user.role !== "exporter" && 
//                 <Link to="/ExporterProducts" className="text-white hover:text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" onClick={closeMobileMenu}>
//                   {t("Products")}
//                 </Link>
//               }

//               {/* Role-based Links */}
//               {user.role === "supplier" && (
//                 <>
//                   <Link to="/SupplierProducts" className="text-white hover:text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" onClick={closeMobileMenu}>
//                     {t("Your Products")}
//                   </Link>
//                   <Link to="/getAllAuctions" className="text-white hover:text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" onClick={closeMobileMenu}>
//                     {t("Auctions")}
//                   </Link>
//                   <Link to="/mySupplierOffers" className="text-white hover:text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" onClick={closeMobileMenu}>
//                     {t("MyOffers")}
//                   </Link>
//                 </>
//               )}

//               {user.role === "exporter" && (
//                 <>
//                   <Link to="/ExporterProducts" className="text-white hover:text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" onClick={closeMobileMenu}>
//                     {t("Products")}
//                   </Link>
//                   <Link to="/createAuction" className="text-white hover:text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" onClick={closeMobileMenu}>
//                     {t("CreateAuction")}
//                   </Link>
//                   <Link to="/getAuctionsOfExporter" className="text-white hover:text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" onClick={closeMobileMenu}>
//                     {t("YourAuctions")}
//                   </Link>
//                   <Link to="/favourites" className="text-white hover:text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" onClick={closeMobileMenu}>
//                     {t("Favorites")}
//                   </Link>
//                 </>
//               )}

//               {user.role && (
//                 <Link to="/chat" className="text-white hover:text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" onClick={closeMobileMenu}>
//                   {t("Chat")}
//                 </Link>
//               )}
//             </div>

//             {/* Right-side elements */}
//             <div className="ml-4 flex items-center space-x-4">
//               {/* Auth/Profile Section */}
//               {!user.role && (
//                 <Link to="/signIn" className="text-white hover:text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" onClick={closeMobileMenu}>
//                   {t("SignIn")}
//                 </Link>
//               )}

//               {user.role && (
//                 <Link 
//                   to="/profile" 
//                   className="text-white hover:text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
//                   onClick={closeMobileMenu}
//                 >
//                   {t("Profile")}
//                 </Link>
//               )}
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center space-x-4">
//             {/* Language Selector (mobile) */}
//             <div className="w-fit bg-secondary-100 rounded-lg p-1">
//               {/* LanguageSelector component here */}
//             </div>
            
//             <button
//               type="button"
//               className="inline-flex items-center justify-center p-2 rounded-md text-primary-100 hover:text-accent-500 focus:outline-none"
//               onClick={toggleMobileMenu}
//               aria-label="Toggle menu"
//             >
//               {isMobileMenuOpen ? (
//                 <i className="ri-close-line text-xl"></i>
//               ) : (
//                 <i className="ri-menu-line text-xl"></i>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-primary-900">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {/* Common Links */}
//               <Link to="/home" className="block px-3 py-2 rounded-md text-base font-medium text-primary-100 hover:text-accent-500 hover:bg-primary-800 transition-colors duration-200" onClick={closeMobileMenu}>
//                 {t("Home")}
//               </Link>
//               <Link to="/SupplierProducts" className="block px-3 py-2 rounded-md text-base font-medium text-primary-100 hover:text-accent-500 hover:bg-primary-800 transition-colors duration-200" onClick={closeMobileMenu}>
//                 {t("Products")}
//               </Link>

//               {/* Role-based Links */}
//               {user.role === "supplier" && (
//                 <>
//                   <Link to="/getAllAuctions" className="block px-3 py-2 rounded-md text-base font-medium text-primary-100 hover:text-accent-500 hover:bg-primary-800 transition-colors duration-200" onClick={closeMobileMenu}>
//                     {t("Auctions")}
//                   </Link>
//                   <Link to="/mySupplierOffers" className="block px-3 py-2 rounded-md text-base font-medium text-primary-100 hover:text-accent-500 hover:bg-primary-800 transition-colors duration-200" onClick={closeMobileMenu}>
//                     {t("MyOffers")}
//                   </Link>
//                 </>
//               )}

//               {user.role === "exporter" && (
//                 <>
//                   <Link to="/createAuction" className="block px-3 py-2 rounded-md text-base font-medium text-primary-100 hover:text-accent-500 hover:bg-primary-800 transition-colors duration-200" onClick={closeMobileMenu}>
//                     {t("CreateAuction")}
//                   </Link>
//                   <Link to="/getAuctionsOfExporter" className="block px-3 py-2 rounded-md text-base font-medium text-primary-100 hover:text-accent-500 hover:bg-primary-800 transition-colors duration-200" onClick={closeMobileMenu}>
//                     {t("YourAuctions")}
//                   </Link>
//                   <Link to="/favourites" className="block px-3 py-2 rounded-md text-base font-medium text-primary-100 hover:text-accent-500 hover:bg-primary-800 transition-colors duration-200" onClick={closeMobileMenu}>
//                     {t("Favorites")}
//                   </Link>
//                 </>
//               )}

//               {user.role && (
//                 <Link to="/chat" className="block px-3 py-2 rounded-md text-base font-medium text-primary-100 hover:text-accent-500 hover:bg-primary-800 transition-colors duration-200" onClick={closeMobileMenu}>
//                   {t("Chat")}
//                 </Link>
//               )}

//               {/* Auth/Profile Section */}
//               {!user.role ? (
//                 <Link to="/signIn" className="block px-3 py-2 rounded-md text-base font-medium text-primary-100 hover:text-accent-500 hover:bg-primary-800 transition-colors duration-200" onClick={closeMobileMenu}>
//                   {t("SignIn")}
//                 </Link>
//               ) : (
//                 <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-primary-100 hover:text-accent-500 hover:bg-primary-800 transition-colors duration-200" onClick={closeMobileMenu}>
//                   {t("Profile")}
//                 </Link>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
// };

// export default Navbar;





// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux"; // Import useSelector
// import "../assets/css/navbar.css";
// import Sial from "../assets/images/sial3.png";

// const Navbar = () => {
//   const user = useSelector((state) => state.user); // Access user state from Redux

//   return (
//     <>
//       <div className="w-full fixed top-0 bg-[#1b263b] z-50">
//         <nav className="w-[80%] flex justify-between py-3 items-center mx-auto">
//           <a href="/home">
//             <img src={Sial} style={{ width: "3rem" }} alt="Sial" />
//           </a>
//           <ul className="nav-links">
//             <li>
//               <Link to="/home">Home</Link>
//             </li>
//             <li>
//               <Link to="/ExporterProducts">Products</Link>
//             </li>

//             {/* Conditionally render SignIn link if user.role does not exist */}
//             {!user.role && (
//               <li>
//                 <Link to="/signIn">SignIn</Link>
//               </li>
//             )}

//             {/* Optionally render user-specific content */}
//             {user.role && (
//               <>
//                 {/* Conditionally render "Your Products" only for suppliers */}
//                 {user.role === "supplier" && (
//                   <>
//                     <li>
//                       <Link to="/SupplierProducts">Your Products</Link>
//                     </li>
//                     <li>
//                       <Link to="/getAllAuctions">Auctions</Link>
//                     </li>

//                     <li>
//                       <Link to="/mySupplierOffers">My Offers</Link>
//                     </li>
//                     <li>
//                       <Link to="/mySupplierOrders">My Orders</Link>
//                     </li>
//                     <li>
//                       <Link to="/supplier/payments">Token Payments</Link>
//                     </li>
//                   </>
//                 )}

//                 {user.role === "exporter" && (
//                   <>
//                     <li>
//                       <Link to="/createAuction">Create Auction</Link>
//                     </li>
//                     <li>
//                       <Link to="/getAuctionsOfExporter">Your Auction</Link>
//                     </li>
//                     <li>
//                       <Link to="/favourites">Your Favourites</Link>
//                     </li>
//                     <li>
//                       <Link to="/myOffers">My Offers</Link>
//                     </li>
//                     <li>
//                       <Link to="/myExporterOrders">My Orders</Link>
//                     </li>
//                   </>
//                 )}

// {user.role === "admin" && (
//                   <>
//                     <li>
//                       <Link to="/admin/user">Users</Link>
//                     </li>
//                     <li>
//                       <Link to="/admin">Profile</Link>
//                     </li>
//                     <li>
//                       <Link to="/admin/user/order/payment">Payments</Link>
//                     </li>
                    
//                   </>
//                 )}


// {user.role !== "admin" && (
//                   <>
//                       <li>
//                   <Link to="/chat">Chat</Link>
//                 </li>

//                 <li>
//                   <Link to="/profile">Profiles</Link>
//                 </li>
                    
//                   </>
//                 )}
              

               

//                 <li className="text-white">
//                   Welcome, {user.name || "User"} ({user.role})
//                 </li>
//               </>
//             )}
//           </ul>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Navbar;


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
// import Sial from "../assets/images/sial3.png";

// const Navbar = () => {
//   const user = useSelector((state) => state.user);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { t, i18n } = useTranslation();

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <div className="w-full fixed top-0 bg-primary-950 shadow-md z-50">
//       <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/home" className="flex items-center" onClick={closeMobileMenu}>
//               <img 
//                 src={Sial} 
//                 className="h-10 w-auto" 
//                 alt="SialConnect Logo"
//               />
//               <span className="ml-2 text-white font-bold text-xl hidden sm:inline">
//                 SialConnect
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Navigation - Centered */}
//           <div className="hidden md:flex items-center justify-center flex-1">
//             <div className="flex space-x-4">
//               {/* Common Links */}
//               <NavLink to="/home" onClick={closeMobileMenu}>{t("Home")}</NavLink>
//               {/* <NavLink to="/ExporterProducts" onClick={closeMobileMenu}>{t("Products")}</NavLink> */}

//               {/* Conditionally render user-specific content */}
//               {user.role && (
//                 <>
//                   {/* Supplier Links */}
//                   {user.role === "supplier" && (
//                     <>
//                       <NavLink to="/SupplierProducts" onClick={closeMobileMenu}>{t("Products")}</NavLink>
//                       <NavLink to="/getAllAuctions" onClick={closeMobileMenu}>{t("Auctions")}</NavLink>
//                       {/* <NavLink to="/mySupplierOffers" onClick={closeMobileMenu}>{t("My Offers")}</NavLink> */}
//                       <NavLink to="/mySupplierOrders" onClick={closeMobileMenu}>{t("My Orders")}</NavLink>
//                       {/* <NavLink to="/supplier/payments" onClick={closeMobileMenu}>{t("Token Payments")}</NavLink> */}
//                     </>
//                   )}

//                   {/* Exporter Links */}
//                   {user.role === "exporter" && (
//                     <>
//                         <NavLink to="/ExporterProducts" onClick={closeMobileMenu}>{t("Products")}</NavLink>
//                       {/* <NavLink to="/createAuction" onClick={closeMobileMenu}>{t("Create Auction")}</NavLink> */}
//                       {/* <NavLink to="/getAuctionsOfExporter" onClick={closeMobileMenu}>{t("Your Auction")}</NavLink> */}
//                       <NavLink to="/exporter" onClick={closeMobileMenu}>{t("Auction")}</NavLink>

//                       <NavLink to="/favourites" onClick={closeMobileMenu}>{t("Your Favourites")}</NavLink>
//                       {/* <NavLink to="/myOffers" onClick={closeMobileMenu}>{t("My Offers")}</NavLink> */}
//                       <NavLink to="/myExporterOrders" onClick={closeMobileMenu}>{t("My Orders")}</NavLink>
//                     </>
//                   )}

//                   {/* Admin Links */}
//                   {user.role === "admin" && (
//                     <>
//                       <NavLink to="/admin/user" onClick={closeMobileMenu}>{t("Users")}</NavLink>
//                       <NavLink to="/admin" onClick={closeMobileMenu}>{t("Dashboard")}</NavLink>
//                       <NavLink to="/admin/user/order/payment" onClick={closeMobileMenu}>{t("Payments")}</NavLink>
//                     </>
//                   )}

//                   {/* Common for non-admin users */}
//                   {user.role !== "admin" && (
//                     <>
//                       <NavLink to="/chat" onClick={closeMobileMenu}>{t("Chat")}</NavLink>
//                       <NavLink to="/profile" onClick={closeMobileMenu}>{t("Profile")}</NavLink>
//                     </>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Right-side elements */}
//           <div className="flex items-center space-x-4">
//             {/* Auth Section */}
//             {!user.role && (
//               <NavLink to="/signIn" onClick={closeMobileMenu} className="whitespace-nowrap">
//                 {t("SignIn")}
//               </NavLink>
//             )}

//             {/* Welcome message
//             {user.role && (
//               <div className="text-primary-100 px-3 py-2 text-sm whitespace-nowrap hidden md:block">
//                 {t("Welcome")}, {user.name || t("User")} ({t(user.role)})
//               </div>
//             )} */}

//             {/* Language Selector */}
//             <div className="w-fit bg-secondary-100 rounded-lg p-1">
//               <div className="flex items-center space-x-1">
//                 <button
//                   onClick={() => changeLanguage('en')}
//                   className={`px-2 py-1 rounded text-xs ${i18n.language === 'en' ? 'bg-primary-600 text-white' : 'text-primary-800 hover:bg-primary-100'}`}
//                 >
//                   EN
//                 </button>
//                 <span className="text-primary-800">|</span>
//                 <button
//                   onClick={() => changeLanguage('ur')}
//                   className={`px-2 py-1 rounded text-xs ${i18n.language === 'ur' ? 'bg-primary-600 text-white' : 'text-primary-800 hover:bg-primary-100'}`}
//                 >
//                   UR
//                 </button>
//               </div>
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden flex items-center">
//               <button
//                 type="button"
//                 className="inline-flex items-center justify-center p-2 rounded-md text-primary-100 hover:text-accent-500 focus:outline-none"
//                 onClick={toggleMobileMenu}
//                 aria-label="Toggle menu"
//               >
//                 {isMobileMenuOpen ? (
//                   <i className="ri-close-line text-xl"></i>
//                 ) : (
//                   <i className="ri-menu-line text-xl"></i>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-primary-900">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {/* Common Links */}
//               <MobileNavLink to="/home" onClick={closeMobileMenu}>{t("Home")}</MobileNavLink>
//               <MobileNavLink to="/ExporterProducts" onClick={closeMobileMenu}>{t("Products")}</MobileNavLink>

//               {/* Conditionally render SignIn link if user.role does not exist */}
//               {!user.role && (
//                 <MobileNavLink to="/signIn" onClick={closeMobileMenu}>{t("SignIn")}</MobileNavLink>
//               )}

//               {/* Conditionally render user-specific content */}
//               {user.role && (
//                 <>
//                   {/* Supplier Links */}
//                   {user.role === "supplier" && (
//                     <>
//                       <MobileNavLink to="/SupplierProducts" onClick={closeMobileMenu}>{t("Your Products")}</MobileNavLink>
//                       <MobileNavLink to="/getAllAuctions" onClick={closeMobileMenu}>{t("Auctions")}</MobileNavLink>
//                       <MobileNavLink to="/mySupplierOffers" onClick={closeMobileMenu}>{t("My Offers")}</MobileNavLink>
//                       <MobileNavLink to="/mySupplierOrders" onClick={closeMobileMenu}>{t("My Orders")}</MobileNavLink>
//                       <MobileNavLink to="/supplier/payments" onClick={closeMobileMenu}>{t("Token Payments")}</MobileNavLink>
//                     </>
//                   )}

//                   {/* Exporter Links */}
//                   {user.role === "exporter" && (
//                     <>
//                       <MobileNavLink to="/createAuction" onClick={closeMobileMenu}>{t("Create Auction")}</MobileNavLink>
//                       <MobileNavLink to="/getAuctionsOfExporter" onClick={closeMobileMenu}>{t("Your Auction")}</MobileNavLink>
//                       <MobileNavLink to="/favourites" onClick={closeMobileMenu}>{t("Your Favourites")}</MobileNavLink>
//                       <MobileNavLink to="/myOffers" onClick={closeMobileMenu}>{t("My Offers")}</MobileNavLink>
//                       <MobileNavLink to="/myExporterOrders" onClick={closeMobileMenu}>{t("My Orders")}</MobileNavLink>
//                     </>
//                   )}

//                   {/* Admin Links */}
//                   {user.role === "admin" && (
//                     <>
//                       <MobileNavLink to="/admin/user" onClick={closeMobileMenu}>{t("Users")}</MobileNavLink>
//                       <MobileNavLink to="/admin" onClick={closeMobileMenu}>{t("Profile")}</MobileNavLink>
//                       <MobileNavLink to="/admin/user/order/payment" onClick={closeMobileMenu}>{t("Payments")}</MobileNavLink>
//                     </>
//                   )}

//                   {/* Common for non-admin users */}
//                   {user.role !== "admin" && (
//                     <>
//                       <MobileNavLink to="/chat" onClick={closeMobileMenu}>{t("Chat")}</MobileNavLink>
//                       <MobileNavLink to="/profile" onClick={closeMobileMenu}>{t("Profile")}</MobileNavLink>
//                     </>
//                   )}

//                   {/* Welcome message */}
//                   <div className="text-primary-100 px-3 py-2 text-sm">
//                     {t("Welcome")}, {user.name || t("User")} ({t(user.role)})
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
// };

// // Reusable NavLink component for desktop
// const NavLink = ({ to, onClick, children, className = "" }) => (
//   <Link 
//     to={to} 
//     className={`text-primary-100 hover:text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${className}`}
//     onClick={onClick}
//   >
//     {children}
//   </Link>
// );

// // Reusable MobileNavLink component
// const MobileNavLink = ({ to, onClick, children }) => (
//   <Link
//     to={to}
//     className="block px-3 py-2 rounded-md text-base font-medium text-primary-100 hover:text-accent-500 hover:bg-primary-800 transition-colors duration-200"
//     onClick={onClick}
//   >
//     {children}
//   </Link>
// );

// export default Navbar;

// New navbar above is previous
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Sial from "../assets/images/sial3.png";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path || 
           (path !== "/home" && location.pathname.startsWith(path));
  };

  return (
    <div className="w-full fixed top-0 bg-primary-950 shadow-md z-50">
      <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home" className="flex items-center" onClick={closeMobileMenu}>
              <img 
                src={Sial} 
                className="h-10 w-auto" 
                alt="SialConnect Logo"
              />
              <span className="ml-2 text-white font-bold text-xl hidden sm:inline">
                SialConnect
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-4">
              {/* Default links shown when not signed in */}
              {!user.role ? (
                <>
                  <NavLink to="/home" onClick={closeMobileMenu} isActive={isActive("/home")}>
                    <i className="ri-home-2-line mr-1"></i> {t("Home")}
                  </NavLink>
                  <NavLink to="/about" onClick={closeMobileMenu} isActive={isActive("/about")}>
                    <i className="ri-information-line mr-1"></i> {t("About")}
                  </NavLink>
                  <NavLink to="/ExporterProducts" onClick={closeMobileMenu} isActive={isActive("/ExporterProducts")}>
                    <i className="ri-search-line mr-1"></i> {t("Products")}
                  </NavLink>
                  <NavLink to="/signIn" onClick={closeMobileMenu} isActive={isActive("/signIn")}>
                    <i className="ri-login-box-line mr-1"></i> {t("SignIn")}
                  </NavLink>
                </>
              ) : (
                <>
                  {/* Show Home link for suppliers and exporters but not admin */}
                  {(user.role === "supplier" || user.role === "exporter") && (
                    <NavLink to="/home" onClick={closeMobileMenu} isActive={isActive("/home")}>
                      <i className="ri-home-2-line mr-1"></i> {t("Home")}
                    </NavLink>
                  )}

                  {/* Supplier Links */}
                  {user.role === "supplier" && (
                    <>
                     <NavLink to="/about" onClick={closeMobileMenu} isActive={isActive("/about")}>
                    <i className="ri-information-line mr-1"></i> {t("About")}
                  </NavLink>
                      <NavLink to="/SupplierProducts" onClick={closeMobileMenu} isActive={isActive("/SupplierProducts")}>
                        <i className="ri-box-3-line mr-1"></i> {t("Products")}
                      </NavLink>
                      <NavLink to="/getAllAuctions" onClick={closeMobileMenu} isActive={isActive("/getAllAuctions")}>
                        <i className="ri-auction-line mr-1"></i> {t("Auctions")}
                      </NavLink>
                      <NavLink to="/mySupplierOrders" onClick={closeMobileMenu} isActive={isActive("/mySupplierOrders")}>
                        <i className="ri-list-check-2 mr-1"></i> {t("My Orders")}
                      </NavLink>
                    </>
                  )}

                  {/* Exporter Links */}
                  {user.role === "exporter" && (
                    <>
                     <NavLink to="/about" onClick={closeMobileMenu} isActive={isActive("/about")}>
                    <i className="ri-information-line mr-1"></i> {t("About")}
                  </NavLink>
                      <NavLink to="/ExporterProducts" onClick={closeMobileMenu} isActive={isActive("/ExporterProducts")}>
                        <i className="ri-search-line mr-1"></i> {t("Products")}
                      </NavLink>
                       <NavLink to="/ExporterRecommendedProducts" onClick={closeMobileMenu} isActive={isActive("/ExporterProducts")}>
                        <i className="ri-search-line mr-1"></i> {t("RecommendedProducts")}
                      </NavLink>
                       <NavLink to="/pricing" onClick={closeMobileMenu} isActive={isActive("/ExporterProducts")}>
                        <i className="ri-search-line mr-1"></i> {t("Pricing")}
                      </NavLink>
                      <NavLink to="/exporter" onClick={closeMobileMenu} isActive={isActive("/exporter")}>
                        <i className="ri-auction-line mr-1"></i> {t("Auction")}
                      </NavLink>
                      <NavLink to="/favourites" onClick={closeMobileMenu} isActive={isActive("/favourites")}>
                        <i className="ri-heart-line mr-1"></i> {t("Your Favourites")}
                      </NavLink>
                      <NavLink to="/myExporterOrders" onClick={closeMobileMenu} isActive={isActive("/myExporterOrders")}>
                        <i className="ri-list-check-2 mr-1"></i> {t("My Orders")}
                      </NavLink>
                    </>
                  )}

                  {/* Admin Links */}
                  {user.role === "admin" && (
                    <>
                      <NavLink to="/admin/user" onClick={closeMobileMenu}>
                        <i className="ri-user-line mr-1"></i> {t("Users")}
                      </NavLink>
                      <NavLink to="/admin" onClick={closeMobileMenu}>
                        <i className="ri-dashboard-line mr-1"></i> {t("Dashboard")}
                      </NavLink>
                      <NavLink to="/admin/user/order/payment" onClick={closeMobileMenu}>
                        <i className="ri-money-dollar-circle-line mr-1"></i> {t("Payments")}
                      </NavLink>
                    </>
                  )}

                  {/* Common for non-admin users */}
                  {user.role !== "admin" && (
                    <>
                      <NavLink to="/chat" onClick={closeMobileMenu} isActive={isActive("/chat")}>
                        <i className="ri-chat-3-line mr-1"></i> {t("Chat")}
                      </NavLink>
                      <NavLink to="/profile" onClick={closeMobileMenu} isActive={isActive("/profile")}>
                        <i className="ri-user-line mr-1"></i> {t("Profile")}
                      </NavLink>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right-side elements */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="w-fit bg-secondary-100 rounded-lg p-1">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-2 py-1 rounded text-xs ${i18n.language === 'en' ? 'bg-primary-600 text-white' : 'text-primary-800 hover:bg-primary-100'}`}
                >
                  EN
                </button>
                <span className="text-primary-800">|</span>
                <button
                  onClick={() => changeLanguage('ur')}
                  className={`px-2 py-1 rounded text-xs ${i18n.language === 'ur' ? 'bg-primary-600 text-white' : 'text-primary-800 hover:bg-primary-100'}`}
                >
                  UR
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-primary-100 hover:text-accent-500 focus:outline-none"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <i className="ri-close-line text-xl"></i>
                ) : (
                  <i className="ri-menu-line text-xl"></i>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-primary-900">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Default links shown when not signed in */}
              {!user.role ? (
                <>
                  <MobileNavLink to="/home" onClick={closeMobileMenu} isActive={isActive("/home")}>
                    <i className="ri-home-2-line mr-2"></i> {t("Home")}
                  </MobileNavLink>
                  <MobileNavLink to="/ExporterProducts" onClick={closeMobileMenu} isActive={isActive("/ExporterProducts")}>
                    <i className="ri-search-line mr-2"></i> {t("Products")}
                  </MobileNavLink>
                  <MobileNavLink to="/signIn" onClick={closeMobileMenu} isActive={isActive("/signIn")}>
                    <i className="ri-login-box-line mr-2"></i> {t("SignIn")}
                  </MobileNavLink>
                </>
              ) : (
                <>
                  {/* Show Home link for suppliers and exporters but not admin */}
                  {(user.role === "supplier" || user.role === "exporter") && (
                    <MobileNavLink to="/home" onClick={closeMobileMenu} isActive={isActive("/home")}>
                      <i className="ri-home-2-line mr-2"></i> {t("Home")}
                    </MobileNavLink>
                  )}

                  {/* Supplier Links */}
                  {user.role === "supplier" && (
                    <>
                      <MobileNavLink to="/SupplierProducts" onClick={closeMobileMenu} isActive={isActive("/SupplierProducts")}>
                        <i className="ri-box-3-line mr-2"></i> {t("Your Products")}
                      </MobileNavLink>
                      <MobileNavLink to="/getAllAuctions" onClick={closeMobileMenu} isActive={isActive("/getAllAuctions")}>
                        <i className="ri-auction-line mr-2"></i> {t("Auctions")}
                      </MobileNavLink>
                      <MobileNavLink to="/mySupplierOrders" onClick={closeMobileMenu} isActive={isActive("/mySupplierOrders")}>
                        <i className="ri-list-check-2 mr-2"></i> {t("My Orders")}
                      </MobileNavLink>
                    </>
                  )}

                  {/* Exporter Links */}
                  {user.role === "exporter" && (
                    <>
                      <MobileNavLink to="/ExporterProducts" onClick={closeMobileMenu} isActive={isActive("/ExporterProducts")}>
                        <i className="ri-search-line mr-2"></i> {t("Products")}
                      </MobileNavLink>
                      <MobileNavLink to="/exporter" onClick={closeMobileMenu} isActive={isActive("/exporter")}>
                        <i className="ri-auction-line mr-2"></i> {t("Auction")}
                      </MobileNavLink>
                      <MobileNavLink to="/favourites" onClick={closeMobileMenu} isActive={isActive("/favourites")}>
                        <i className="ri-heart-line mr-2"></i> {t("Your Favourites")}
                      </MobileNavLink>
                      <MobileNavLink to="/myExporterOrders" onClick={closeMobileMenu} isActive={isActive("/myExporterOrders")}>
                        <i className="ri-list-check-2 mr-2"></i> {t("My Orders")}
                      </MobileNavLink>
                    </>
                  )}

                  {/* Admin Links */}
                  {user.role === "admin" && (
                    <>
                      <MobileNavLink to="/admin/user" onClick={closeMobileMenu}>
                        <i className="ri-user-line mr-2"></i> {t("Users")}
                      </MobileNavLink>
                      <MobileNavLink to="/admin" onClick={closeMobileMenu}>
                        <i className="ri-dashboard-line mr-2"></i> {t("Dashboard")}
                      </MobileNavLink>
                      <MobileNavLink to="/admin/user/order/payment" onClick={closeMobileMenu}>
                        <i className="ri-money-dollar-circle-line mr-2"></i> {t("Payments")}
                      </MobileNavLink>
                    </>
                  )}

                  {/* Common for non-admin users */}
                  {user.role !== "admin" && (
                    <>
                      <MobileNavLink to="/chat" onClick={closeMobileMenu} isActive={isActive("/chat")}>
                        <i className="ri-chat-3-line mr-2"></i> {t("Chat")}
                      </MobileNavLink>
                      <MobileNavLink to="/profile" onClick={closeMobileMenu} isActive={isActive("/profile")}>
                        <i className="ri-user-line mr-2"></i> {t("Profile")}
                      </MobileNavLink>
                    </>
                  )}

                  {/* Welcome message */}
                  <div className="text-primary-100 px-3 py-2 text-sm">
                    {t("Welcome")}, {user.name || t("User")} ({t(user.role)})
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

// Reusable NavLink component for desktop
const NavLink = ({ to, onClick, children, isActive, className = "" }) => (
  <Link 
    to={to} 
    className={`${isActive ? 'text-accent-500 font-semibold' : 'text-primary-100'} hover:text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${className}`}
    onClick={onClick}
  >
    {children}
  </Link>
);

// Reusable MobileNavLink component
const MobileNavLink = ({ to, onClick, children, isActive }) => (
  <Link
    to={to}
    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-accent-500 bg-primary-800 font-semibold' : 'text-primary-100 hover:text-accent-500 hover:bg-primary-800'} transition-colors duration-200 flex items-center`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Sial from "../assets/images/sial3.png";

// const Navbar = () => {
//   const user = useSelector((state) => state.user);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <div className="w-full fixed top-0 bg-blue-800 shadow-md z-50">
//       <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/home" className="flex items-center" onClick={closeMobileMenu}>
//               <img 
//                 src={Sial} 
//                 className="h-10 w-auto" 
//                 alt="Sial Logo"
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation - Centered */}
//           <div className="hidden md:flex items-center justify-center flex-1">
//             <div className="flex space-x-2">
//               {/* Common Links */}
//               <NavLink to="/home" onClick={closeMobileMenu}>Home</NavLink>
//               <NavLink to="/ExporterProducts" onClick={closeMobileMenu}>Products</NavLink>

//               {/* Conditionally render user-specific content */}
//               {user.role && (
//                 <>
//                   {/* Supplier Links */}
//                   {user.role === "supplier" && (
//                     <>
//                       <NavLink to="/SupplierProducts" onClick={closeMobileMenu}>Your Products</NavLink>
//                       <NavLink to="/getAllAuctions" onClick={closeMobileMenu}>Auctions</NavLink>
//                       <NavLink to="/mySupplierOffers" onClick={closeMobileMenu}>My Offers</NavLink>
//                       <NavLink to="/mySupplierOrders" onClick={closeMobileMenu}>My Orders</NavLink>
//                       <NavLink to="/supplier/payments" onClick={closeMobileMenu}>Token Payments</NavLink>
//                     </>
//                   )}

//                   {/* Exporter Links */}
//                   {user.role === "exporter" && (
//                     <>
//                       <NavLink to="/createAuction" onClick={closeMobileMenu}>Create Auction</NavLink>
//                       <NavLink to="/getAuctionsOfExporter" onClick={closeMobileMenu}>Your Auction</NavLink>
//                       <NavLink to="/favourites" onClick={closeMobileMenu}>Your Favourites</NavLink>
//                       <NavLink to="/myOffers" onClick={closeMobileMenu}>My Offers</NavLink>
//                       <NavLink to="/myExporterOrders" onClick={closeMobileMenu}>My Orders</NavLink>
//                     </>
//                   )}

//                   {/* Admin Links */}
//                   {user.role === "admin" && (
//                     <>
//                       <NavLink to="/admin/user" onClick={closeMobileMenu}>Users</NavLink>
//                       <NavLink to="/admin" onClick={closeMobileMenu}>Profile</NavLink>
//                       <NavLink to="/admin/user/order/payment" onClick={closeMobileMenu}>Payments</NavLink>
//                     </>
//                   )}

//                   {/* Common for non-admin users */}
//                   {user.role !== "admin" && (
//                     <>
//                       <NavLink to="/chat" onClick={closeMobileMenu}>Chat</NavLink>
//                       <NavLink to="/profile" onClick={closeMobileMenu}>Profile</NavLink>
//                     </>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Right-side elements */}
//           <div className="flex items-center space-x-4">
//             {/* Auth Section */}
//             {!user.role && (
//               <NavLink to="/signIn" onClick={closeMobileMenu} className="whitespace-nowrap">SignIn</NavLink>
//             )}

//             {/* Welcome message */}
//             {user.role && (
//               <div className="text-white px-3 py-2 text-sm whitespace-nowrap hidden md:block">
//                 Welcome, {user.name || "User"} ({user.role})
//               </div>
//             )}

//             {/* Mobile menu button */}
//             <div className="md:hidden flex items-center">
//               <button
//                 type="button"
//                 className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
//                 onClick={toggleMobileMenu}
//                 aria-label="Toggle menu"
//               >
//                 {isMobileMenuOpen ? (
//                   <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 ) : (
//                   <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-blue-700">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {/* Common Links */}
//               <MobileNavLink to="/home" onClick={closeMobileMenu}>Home</MobileNavLink>
//               <MobileNavLink to="/ExporterProducts" onClick={closeMobileMenu}>Products</MobileNavLink>

//               {/* Conditionally render SignIn link if user.role does not exist */}
//               {!user.role && (
//                 <MobileNavLink to="/signIn" onClick={closeMobileMenu}>SignIn</MobileNavLink>
//               )}

//               {/* Conditionally render user-specific content */}
//               {user.role && (
//                 <>
//                   {/* Supplier Links */}
//                   {user.role === "supplier" && (
//                     <>
//                       <MobileNavLink to="/SupplierProducts" onClick={closeMobileMenu}>Your Products</MobileNavLink>
//                       <MobileNavLink to="/getAllAuctions" onClick={closeMobileMenu}>Auctions</MobileNavLink>
//                       <MobileNavLink to="/mySupplierOffers" onClick={closeMobileMenu}>My Offers</MobileNavLink>
//                       <MobileNavLink to="/mySupplierOrders" onClick={closeMobileMenu}>My Orders</MobileNavLink>
//                       <MobileNavLink to="/supplier/payments" onClick={closeMobileMenu}>Token Payments</MobileNavLink>
//                     </>
//                   )}

//                   {/* Exporter Links */}
//                   {user.role === "exporter" && (
//                     <>
//                       <MobileNavLink to="/createAuction" onClick={closeMobileMenu}>Create Auction</MobileNavLink>
//                       <MobileNavLink to="/getAuctionsOfExporter" onClick={closeMobileMenu}>Your Auction</MobileNavLink>
//                       <MobileNavLink to="/favourites" onClick={closeMobileMenu}>Your Favourites</MobileNavLink>
//                       <MobileNavLink to="/myOffers" onClick={closeMobileMenu}>My Offers</MobileNavLink>
//                       <MobileNavLink to="/myExporterOrders" onClick={closeMobileMenu}>My Orders</MobileNavLink>
//                     </>
//                   )}

//                   {/* Admin Links */}
//                   {user.role === "admin" && (
//                     <>
//                       <MobileNavLink to="/admin/user" onClick={closeMobileMenu}>Users</MobileNavLink>
//                       <MobileNavLink to="/admin" onClick={closeMobileMenu}>Profile</MobileNavLink>
//                       <MobileNavLink to="/admin/user/order/payment" onClick={closeMobileMenu}>Payments</MobileNavLink>
//                     </>
//                   )}

//                   {/* Common for non-admin users */}
//                   {user.role !== "admin" && (
//                     <>
//                       <MobileNavLink to="/chat" onClick={closeMobileMenu}>Chat</MobileNavLink>
//                       <MobileNavLink to="/profile" onClick={closeMobileMenu}>Profile</MobileNavLink>
//                     </>
//                   )}

//                   {/* Welcome message */}
//                   <div className="text-white px-3 py-2 text-sm">
//                     Welcome, {user.name || "User"} ({user.role})
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
// };

// // Reusable NavLink component for desktop
// const NavLink = ({ to, onClick, children, className = "" }) => (
//   <Link 
//     to={to} 
//     className={`text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${className}`}
//     onClick={onClick}
//   >
//     {children}
//   </Link>
// );

// // Reusable MobileNavLink component
// const MobileNavLink = ({ to, onClick, children }) => (
//   <Link
//     to={to}
//     className="block text-white hover:bg-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
//     onClick={onClick}
//   >
//     {children}
//   </Link>
// );

// export default Navbar;