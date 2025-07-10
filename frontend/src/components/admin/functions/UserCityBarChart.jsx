// import React from "react";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const UserCityBarChart = ({ users, loading }) => {
//   const cityCounts = users.reduce((acc, user) => {
//     const city = user.city || "Unknown";
//     acc[city] = (acc[city] || 0) + 1;
//     return acc;
//   }, {});

//   const chartData = {
//     labels: Object.keys(cityCounts),
//     datasets: [
//       {
//         label: "Users per City",
//         data: Object.values(cityCounts),
//         backgroundColor: "#60a5fa",
//         borderColor: "#3b82f6",
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="card w-full bg-base-100 shadow-xl p-4 mt-6">
//       <h2 className="text-xl font-bold mb-4 text-center">Users by City</h2>
//       {!loading ? <Bar data={chartData} /> : <div className="text-center">Loading...</div>}
//     </div>
//   );
// };

// export default UserCityBarChart;

// // UserCityBarChart.jsx
// import React from "react";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const UserCityBarChart = ({ users, loading }) => {
//   const cityCounts = users.reduce((acc, user) => {
//     const city = user.city || "Unknown";
//     acc[city] = (acc[city] || 0) + 1;
//     return acc;
//   }, {});

//   const chartData = {
//     labels: Object.keys(cityCounts),
//     datasets: [
//       {
//         label: "Users",
//         data: Object.values(cityCounts),
//         backgroundColor: "#6366F1", // primary-500
//         borderColor: "#3730A3", // primary-800
//         borderWidth: 1,
//         borderRadius: 4,
//         hoverBackgroundColor: "#818CF8", // primary-400
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false
//       },
//       tooltip: {
//         backgroundColor: '#1F2937', // neutral-800
//         titleColor: '#F9FAFB', // neutral-50
//         bodyColor: '#E5E7EB', // neutral-200
//         padding: 12,
//         cornerRadius: 8
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: '#E5E7EB', // neutral-200
//         },
//         ticks: {
//           color: '#4B5563' // neutral-600
//         }
//       },
//       x: {
//         grid: {
//           display: false
//         },
//         ticks: {
//           color: '#4B5563' // neutral-600
//         }
//       }
//     },
//     maintainAspectRatio: false
//   };

//   return (
//     <div className="h-full w-full">
//       {!loading ? (
//         <Bar 
//           data={chartData} 
//           options={options} 
//           className="max-h-full"
//         />
//       ) : (
//         <div className="h-full flex items-center justify-center">
//           <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserCityBarChart;


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
  // Calculate city counts, excluding 'Unknown'
  const cityCounts = users.reduce((acc, user) => {
    const city = user.city || "Unknown";
    if (city !== "Unknown") {  // Only count cities that are not 'Unknown'
      acc[city] = (acc[city] || 0) + 1;
    }
    return acc;
  }, {});

  // Generate chart data, excluding 'Unknown' cities
  const chartData = {
    labels: Object.keys(cityCounts),
    datasets: [
      {
        label: "Users",
        data: Object.values(cityCounts),
        backgroundColor: "#6366F1", // primary-500
        borderColor: "#3730A3", // primary-800
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: "#818CF8", // primary-400
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1F2937', // neutral-800
        titleColor: '#F9FAFB', // neutral-50
        bodyColor: '#E5E7EB', // neutral-200
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#E5E7EB', // neutral-200
        },
        ticks: {
          color: '#4B5563', // neutral-600
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#4B5563', // neutral-600
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="h-full w-full">
      {!loading ? (
        <Bar
          data={chartData}
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

export default UserCityBarChart;
