import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Go Back", className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded ${className}`}
    >
      {label}
    </button>
  );
};

export default BackButton;
