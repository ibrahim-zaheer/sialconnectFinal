import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const CategoryPieChart = ({ categoryData }) => {
  // Prepare chart data
  const chartData = {
    labels: categoryData.map((item) => item.productId?.category),
    datasets: [
      {
        data: categoryData.map((item) => item.count),
        backgroundColor: [
          "#FF5733", "#33FF57", "#3357FF", "#FF33A5", "#FFC300", "#FF6633", "#33FFFF", "#FF5733"
        ], // Customize your color palette
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="text-center mb-4">Orders by Product Category</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default CategoryPieChart;
