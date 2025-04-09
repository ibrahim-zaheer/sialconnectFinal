import React from "react";

const ageRanges = [
  { label: "All Ages", value: "" },
  { label: "18–25", min: 18, max: 25 },
  { label: "26–35", min: 26, max: 35 },
  { label: "36–45", min: 36, max: 45 },
  { label: "46+", min: 46, max: 100 },
];

const UserFilters = ({ search, city, ageRange, onSearch, onCityChange, onAgeChange, cityOptions }) => {
  return (
    <div className="mb-4 flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="Search by name or email"
        className="p-2 border rounded-md"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <select
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="">All Cities</option>
        {cityOptions.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select
        value={ageRange}
        onChange={(e) => onAgeChange(e.target.value)}
        className="p-2 border rounded-md"
      >
        {ageRanges.map((range, index) => (
          <option key={index} value={index}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserFilters;
