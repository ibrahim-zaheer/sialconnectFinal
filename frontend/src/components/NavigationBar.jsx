import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector
import "../assets/css/navbar.css";
import Sial from "../assets/images/sial3.png";

const Navbar = () => {
  const user = useSelector((state) => state.user); // Access user state from Redux

  return (
    <>
      <div className="w-full fixed top-0 bg-[#1b263b] z-50">
        <nav className="w-[80%] flex justify-between py-3 items-center mx-auto">
          <a href="/home">
            <img src={Sial} style={{ width: "3rem" }} alt="Sial" />
          </a>
          <ul className="nav-links">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>

            {/* Conditionally render SignIn link if user.role does not exist */}
            {!user.role && (
              <li>
                <Link to="/signIn">SignIn</Link>
              </li>
            )}

            {/* Optionally render user-specific content */}
            {user.role && (
              <>
                               {/* Conditionally render "Your Products" only for suppliers */}
                               {user.role === "supplier" && (
                  <li>
                    <Link to="/SupplierProducts">Your Products</Link>
                  </li>
                )}


                <li>
                  <Link to="/profile">Profiles</Link>
                </li>

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
