import React from "react";

const RoleFilter = ({ selectedRole, onRoleChange }) => {
  return (
    <div className="mb-4">
      <label className="font-medium mr-2">Filter by Role:</label>
      <select
        value={selectedRole}
        onChange={(e) => onRoleChange(e.target.value)}
        className="border rounded px-3 py-1"
      >
        <option value="">All</option>
        <option value="supplier">Supplier</option>
        <option value="exporter">Exporter</option>
      </select>
    </div>
  );
};

export default RoleFilter;
