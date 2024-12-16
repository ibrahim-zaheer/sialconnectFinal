import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../redux/reducers/userSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from Redux store and localStorage
    dispatch(clearUser());

    // Redirect to the login page
    navigate("/"); // Adjust the route as per your login page
  };

  return (
    <div className="w-[20vw] mx-auto flex justify-center items-center">
      <button
        className="mt-2 border-1 px-5 py-2 text-[1rem] rounded-lg bg-[#1b263b] text-white hover:bg-[#415a77] transition-all duration-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
