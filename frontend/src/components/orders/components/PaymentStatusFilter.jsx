// Reusable filter dropdown for payment status
import React from 'react';

const PaymentStatusFilter = ({ value, onChange }) => {
  return (
    <div className="px-6 py-4">
      <label className="block text-sm font-medium text-neutral-700 mb-1">Filter by Status:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm text-sm focus:outline-none"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="detailsGiven">Detail Given</option>
      </select>
    </div>
  );
};

export default PaymentStatusFilter;
