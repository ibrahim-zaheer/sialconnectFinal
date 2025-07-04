
import React from "react";

const BackButtonNewTab = ({ 
  label = "Back", 
  className = "", 
  onClick 
}) => {
  return (
    <div className="p-1">
      <button
        onClick={onClick}
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

export default BackButtonNewTab;