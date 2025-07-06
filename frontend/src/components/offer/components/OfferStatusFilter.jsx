// components/OfferStatusFilter.jsx
import React from "react";

export default function OfferStatusFilter({ selectedStatus, onChange }) {
  const statuses = ["all", "pending", "accepted", "rejected"];

  return (
    <div className="flex gap-3 justify-center">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200
            ${
              selectedStatus === status
                ? "bg-primary-600 text-white border-primary-600"
                : "bg-white text-primary-600 border-primary-300 hover:bg-primary-50"
            }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
}
