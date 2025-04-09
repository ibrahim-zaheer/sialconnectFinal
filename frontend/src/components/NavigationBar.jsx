import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Sial from "../assets/images/sial3.png";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-4">
              {/* Common Links */}
              <NavLink to="/home" onClick={closeMobileMenu}>{t("Home")}</NavLink>
              {
                user.role !== "supplier" && user.role !== "exporter" && 
                <NavLink to="/ExporterProducts" onClick={closeMobileMenu}>{t("Products")}</NavLink>
              }

              {/* Role-based Links */}
              {user.role === "supplier" && (
                <>
                  <NavLink to="/SupplierProducts" onClick={closeMobileMenu}>{t("Your Products")}</NavLink>
                  <NavLink to="/getAllAuctions" onClick={closeMobileMenu}>{t("Auctions")}</NavLink>
                  <NavLink to="/mySupplierOffers" onClick={closeMobileMenu}>{t("MyOffers")}</NavLink>
                </>
              )}

              {user.role === "exporter" && (
                <>
                  <NavLink to="/ExporterProducts" onClick={closeMobileMenu}>{t("Products")}</NavLink>
                  <NavLink to="/createAuction" onClick={closeMobileMenu}>{t("CreateAuction")}</NavLink>
                  <NavLink to="/getAuctionsOfExporter" onClick={closeMobileMenu}>{t("YourAuctions")}</NavLink>
                  <NavLink to="/favourites" onClick={closeMobileMenu}>{t("Favorites")}</NavLink>
                </>
              )}

              {user.role && (
                <NavLink to="/chat" onClick={closeMobileMenu}>{t("Chat")}</NavLink>
              )}
            </div>

            {/* Right-side elements */}
            <div className="ml-4 flex items-center space-x-4">

              {/* Auth/Profile Section */}
              {!user.role && (
                <NavLink to="/signIn" onClick={closeMobileMenu}>{t("SignIn")}</NavLink>
              )}

              {user.role && (
                <Link 
                  to="/profile" 
                  className="flex items-center text-primary-100 hover:text-accent-500 transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  {/* <i className="ri-user-fill text-xl"></i> */}
                  <span className="ml-1 hidden sm:inline">{t("Profile")}</span>
                </Link>
              )}

            </div>
          </div>
              {/* Language Selector */}
              <div className="w-fit bg-secondary-100 rounded-lg p-1">
                <LanguageSelector />
              </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Language Selector (mobile) */}
            <div className="w-fit bg-secondary-100 rounded-lg p-1">
              <LanguageSelector />
            </div>
            
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

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-primary-900">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Common Links */}
              <MobileNavLink to="/home" onClick={closeMobileMenu}>{t("Home")}</MobileNavLink>
              <MobileNavLink to="/SupplierProducts" onClick={closeMobileMenu}>{t("Products")}</MobileNavLink>

              {/* Role-based Links */}
              {user.role === "supplier" && (
                <>
                  {/* <MobileNavLink to="/SupplierProducts" onClick={closeMobileMenu}>{t("YourProducts")}</MobileNavLink> */}
                  <MobileNavLink to="/getAllAuctions" onClick={closeMobileMenu}>{t("Auctions")}</MobileNavLink>
                  <MobileNavLink to="/mySupplierOffers" onClick={closeMobileMenu}>{t("MyOffers")}</MobileNavLink>
                    <li>
                      <Link to="/mySupplierOrders">My Orders</Link>
                    </li>
                </>
              )}

              {user.role === "exporter" && (
                <>
                  <MobileNavLink to="/createAuction" onClick={closeMobileMenu}>{t("CreateAuction")}</MobileNavLink>
                  <MobileNavLink to="/getAuctionsOfExporter" onClick={closeMobileMenu}>{t("YourAuctions")}</MobileNavLink>
                  <MobileNavLink to="/favourites" onClick={closeMobileMenu}>{t("Favorites")}</MobileNavLink>
                    <li>
                      <Link to="/myExporterOrders">My Orders</Link>
                    </li>
                  </>
                )}

{user.role === "admin" && (
                  <>
                    <li>
                      <Link to="/admin/user">Users</Link>
                    </li>
                    <li>
                      <Link to="/admin">Profile</Link>
                    </li>
                    
                </>
              )}


{user.role !== "admin" && (
                  <>
                      <li>
                  <Link to="/chat">Chat</Link>
                </li>

                <li>
                  <Link to="/profile">Profiles</Link>
                </li>
                    
                  </>
                )}
              

               

                <li className="text-white">
                  Welcome, {user.name || "User"} ({user.role})
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;