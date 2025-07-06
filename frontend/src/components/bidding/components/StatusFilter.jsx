import React from "react";

const StatusFilter = ({ selected, onChange }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange("all")}
        className={`px-4 py-2 rounded-md text-sm font-medium border ${
          selected === "all"
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-gray-700 border-gray-300"
        }`}
      >
        All
      </button>
      <button
        onClick={() => onChange("active")}
        className={`px-4 py-2 rounded-md text-sm font-medium border ${
          selected === "active"
            ? "bg-green-600 text-white border-green-600"
            : "bg-white text-gray-700 border-gray-300"
        }`}
      >
        Active
      </button>
      <button
        onClick={() => onChange("expired")}
        className={`px-4 py-2 rounded-md text-sm font-medium border ${
          selected === "expired"
            ? "bg-red-600 text-white border-red-600"
            : "bg-white text-gray-700 border-gray-300"
        }`}
      >
        Expired
      </button>
    </div>
  );
};

export default StatusFilter;
