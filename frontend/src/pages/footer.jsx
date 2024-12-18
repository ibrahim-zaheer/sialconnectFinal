import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1b263b] text-white py-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
        {/* Logo & Social Media */}
        <div>
          <h2 className="text-2xl font-bold mb-4">SialConnect</h2>
          <p className="text-sm mb-2">Social Media</p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold mb-4">SHOP</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#">Products</a>
            </li>
            <li>
              <a href="#">Overview</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Releases</a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">STAY UP TO DATE</h3>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 flex-1 text-black rounded-l-md focus:outline-none border-none"
            />
            <button
              type="submit"
              className="border border-gray-600 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-r-md"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}

      {/* Footer Links */}
      <div className="flex justify-center mt-6 pt-6 -mb-3 items-center border-t">
        &copy; Copyright All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
