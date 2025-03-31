import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const UserCityBarChart = ({ users, loading }) => {
  const cityCounts = users.reduce((acc, user) => {
    const city = user.city || "Unknown";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(cityCounts),
    datasets: [
      {
        label: "Users per City",
        data: Object.values(cityCounts),
        backgroundColor: "#60a5fa",
        borderColor: "#3b82f6",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl p-4 mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">Users by City</h2>
      {!loading ? <Bar data={chartData} /> : <div className="text-center">Loading...</div>}
    </div>
  );
};

export default UserCityBarChart;
