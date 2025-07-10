// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const OrderLineChart = ({ orders }) => {
//   // Prepare data for the chart
//   const prepareChartData = () => {
//     const labels = []; // Months & Years (e.g., "06-2025")
//     const orderCounts = {}; // Count of orders per month/year

//     orders.forEach((order) => {
//       const date = new Date(order.createdAt);
//       const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // Format as MM-YYYY

//       if (!orderCounts[monthYear]) {
//         orderCounts[monthYear] = 0;
//       }
//       orderCounts[monthYear]++;
//     });

//     // Fill labels (months-years) and data
//     const sortedLabels = Object.keys(orderCounts).sort();
//     const data = sortedLabels.map((label) => orderCounts[label]);

//     return {
//       labels: sortedLabels,  // List of months/years
//       datasets: [
//         {
//           label: 'Orders Count',  // Label for the line chart
//           data: data,             // Data points (counts of orders)
//           fill: false,            // No fill under the line
//           borderColor: 'rgba(75,192,192,1)', // Line color
//           tension: 0.1,           // Line smoothness
//         },
//       ],
//     };
//   };

//   // Chart data for line chart
//   const chartData = prepareChartData();

//   return (
//     <div className="chart-container">
//       <h2 className="text-center mb-4">Orders by Month</h2>
//       <Line data={chartData} />
//     </div>
//   );
// };

// export default OrderLineChart;

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OrderLineChart = ({ orders }) => {
  // Prepare data for the chart
  const prepareChartData = () => {
    const labels = []; // Months & Years (e.g., "March 2025")
    const orderCounts = {}; // Count of orders per month/year

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`; // Format as Month YYYY

      if (!orderCounts[monthYear]) {
        orderCounts[monthYear] = 0;
      }
      orderCounts[monthYear]++;
    });

    // Fill labels (months-years) and data
    const sortedLabels = Object.keys(orderCounts).sort();
    const data = sortedLabels.map((label) => orderCounts[label]);

    return {
      labels: sortedLabels,  // List of months/years in full month name format
      datasets: [
        {
          label: '',  // Label for the line chart
          data: data,             // Data points (counts of orders)
          fill: false,            // No fill under the line
          borderColor: 'rgba(75,192,192,1)', // Line color
          tension: 0.1,           // Line smoothness
        },
      ],
    };
  };

  // Chart data for line chart
  const chartData = prepareChartData();

  return (
    <div className="chart-container">
      {/* <h2 className="text-center mb-4">Orders by Month</h2> */}
      <Line data={chartData} />
    </div>
  );
};

export default OrderLineChart;
