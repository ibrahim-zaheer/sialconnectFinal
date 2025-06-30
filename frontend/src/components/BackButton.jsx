import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back", className = "" }) => {
  const navigate = useNavigate();

  return (
    <div className="p-1">
      <button
        onClick={() => navigate(-1)}
        className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded ${className}`}
      >
        <span>
          <i className="ri-arrow-left-line pr-2"></i>
        </span>
        {label}
      </button>
    </div>
  );
};

export default BackButton;
