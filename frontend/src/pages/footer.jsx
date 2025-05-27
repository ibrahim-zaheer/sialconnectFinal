import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ContactForm } from "../components/ContactForm";

const Footer = () => {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();

  // Common links for all users
  const commonLinks = [
    { to: "/home", text: "Home", icon: "ri-home-2-line" },
    { to: "/ExporterProducts", text: "Products", icon: "ri-search-line" },
  ];

  // Links for non-logged in users
  const guestLinks = [
    { to: "/signIn", text: "SignIn", icon: "ri-login-box-line" },
  ];

  // Links for suppliers
  const supplierLinks = [
    { to: "/SupplierProducts", text: "Your Products", icon: "ri-box-3-line" },
    { to: "/getAllAuctions", text: "Auctions", icon: "ri-auction-line" },
    { to: "/mySupplierOrders", text: "My Orders", icon: "ri-list-check-2" },
  ];

  // Links for exporters
  const exporterLinks = [
    { to: "/exporter", text: "Auction", icon: "ri-auction-line" },
    { to: "/favourites", text: "Your Favourites", icon: "ri-heart-line" },
    { to: "/myExporterOrders", text: "My Orders", icon: "ri-list-check-2" },
  ];

  // Links for admin
  const adminLinks = [
    { to: "/admin/user", text: "Users", icon: "ri-user-line" },
    { to: "/admin", text: "Dashboard", icon: "ri-dashboard-line" },
    {
      to: "/admin/user/order/payment",
      text: "Payments",
      icon: "ri-money-dollar-circle-line",
    },
  ];

  // Common for non-admin users
  const userLinks = [
    { to: "/chat", text: "Chat", icon: "ri-chat-3-line" },
    { to: "/profile", text: "Profile", icon: "ri-user-line" },
  ];

  // Company information links
  const companyLinks = [
    { to: "/about", text: "About Us" },
    { to: "/careers", text: "Careers" },
    { to: "/blog", text: "Blog" },
    { to: "/faq", text: "FAQ" },
  ];

  // Legal links
  const legalLinks = [
    { to: "/privacy", text: "Privacy Policy" },
    { to: "/terms", text: "Terms of Service" },
    { to: "/cookies", text: "Cookies Policy" },
  ];

  // Determine which links to show based on user role
  const getQuickLinks = () => {
    if (!user.role) return [...commonLinks, ...guestLinks];

    let links = [...commonLinks];

    if (user.role === "supplier") links = [...links, ...supplierLinks];
    if (user.role === "exporter") links = [...links, ...exporterLinks];
    if (user.role === "admin") links = [...adminLinks];
    if (user.role !== "admin") links = [...links, ...userLinks];

    return links;
  };

  return (
    <footer className="bg-primary-900 text-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary-50">SialConnect</h2>
          <p className="text-neutral-300 text-sm">
            {t("Connecting businesses with quality suppliers since 2023")}
          </p>
          <div className="flex space-x-4 pt-2">
            <a
              href="#"
              aria-label="Facebook"
              className="text-neutral-300 hover:text-primary-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-neutral-300 hover:text-primary-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-neutral-300 hover:text-primary-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-primary-50 mb-4">
            {t("QUICK LINKS")}
          </h3>
          <ul className="space-y-3">
            {getQuickLinks().map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-neutral-300 hover:text-primary-400 text-sm transition-colors flex items-center"
                >
                  <i className={`${link.icon} mr-2`}></i>
                  {t(link.text)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-primary-50 mb-4">
            {t("COMPANY")}
          </h3>
          <ul className="space-y-3">
            {companyLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-neutral-300 hover:text-primary-400 text-sm transition-colors"
                >
                  {t(link.text)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-lg font-semibold text-primary-50 mb-4">
            {t("CONTACT US")}
          </h3>
          <ContactForm />
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-neutral-800">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
          <p>
            &copy; {new Date().getFullYear()} SialConnect.{" "}
            {t("All rights reserved.")}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-primary-400 transition-colors"
              >
                {t(link.text)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
