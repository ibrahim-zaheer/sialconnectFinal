// import React from "react";
// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const UserRolePieChart = ({ users, loading }) => {
//   const exporterCount = users.filter((u) => u.role === "exporter").length;
//   const supplierCount = users.filter((u) => u.role === "supplier").length;

//   const data = {
//     labels: ["Exporters", "Suppliers"],
//     datasets: [
//       {
//         data: [exporterCount, supplierCount],
//         backgroundColor: ["#3b82f6", "#facc15"],
//         borderColor: ["#1d4ed8", "#eab308"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="card w-full max-w-md bg-base-100 shadow-xl p-4">
//       <h2 className="text-xl font-bold mb-4 text-center">User Role Distribution</h2>
//       {!loading ? <Pie data={data} /> : <div className="text-center">Loading...</div>}
//     </div>
//   );
// };

// export default UserRolePieChart;

// UserRolePieChart.jsx
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
        backgroundColor: ["#6366F1", "#10B981"], // Using primary-500 and secondary-500
        borderColor: ["#3730A3", "#065F46"], // Using primary-800 and secondary-800
        borderWidth: 1,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#111827', // text-primary
          font: {
            size: 14
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: '#1F2937', // neutral-800
        titleColor: '#F9FAFB', // neutral-50
        bodyColor: '#E5E7EB', // neutral-200
        padding: 12,
        cornerRadius: 8
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="h-full w-full">
      {!loading ? (
        <Pie 
          data={data} 
          options={options} 
          className="max-h-full"
        />
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default UserRolePieChart;