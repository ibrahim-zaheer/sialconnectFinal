import React from "react";

const categories = [
  "Industrial Machinery",
  "Construction Materials",
  "Textiles & Fabrics",
  "Chemicals",
  "Metals & Minerals",
  "Agricultural Equipment",
  "Medical Equipment",
  "Electrical Components",
  "Automotive Parts",
  "Renewable Energy Products",
  "Furniture",
  "Plastic Products",
  "Leather Goods",
  "Handicrafts",
  "Packaging Materials",
  "Wood & Timber",
  "Ceramics & Sanitaryware",
  "Glass Products",
  "Defense Equipment",
  "Aerospace Components",
  "Other"
];

const CategoryDropdown = ({ value, onChange, label = "Category", required = true, name = "category" }) => {
  return (
    <div className="my-4 flex flex-col justify-center gap-2">
      <label className="font-semibold text-[#e0e1dd]">{label}</label>
      <select
        className="px-2 py-2 bg-[#f1f1f1] rounded-lg"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
