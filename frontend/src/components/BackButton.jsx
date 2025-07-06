import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back", className = "" }) => {
  const navigate = useNavigate();

  return (
    <div className="p-1">
      <button
        // onClick={() => navigate(-1)}
        onClick={() => navigate(-1, { replace: true })}
        className={`font-semibold py-2 px-4 rounded ${className}`}
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
