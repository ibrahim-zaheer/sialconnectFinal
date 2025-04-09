import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserRolePieChart = ({ users, loading }) => {
  const exporterCount = users.filter((u) => u.role === "exporter").length;
  const supplierCount = users.filter((u) => u.role === "supplier").length;

  const data = {
    labels: ["Exporters", "Suppliers"],
    datasets: [
      {
        data: [exporterCount, supplierCount],
        backgroundColor: ["#3b82f6", "#facc15"],
        borderColor: ["#1d4ed8", "#eab308"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl p-4">
      <h2 className="text-xl font-bold mb-4 text-center">User Role Distribution</h2>
      {!loading ? <Pie data={data} /> : <div className="text-center">Loading...</div>}
    </div>
  );
};

export default UserRolePieChart;
