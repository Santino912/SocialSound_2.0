import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const PieComponent = ({data:{bannedCount, premiumCount, regularCount}}) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Premium Users", "Regular Users", "Banned Users"],
    datasets: [
      {
        label: "Type Users",
        data: [premiumCount, regularCount, bannedCount],
        backgroundColor: [
          "rgba(255, 207, 86, 0.7)",
          "rgba(54, 235, 205, 0.7)",
          "rgba(255, 99, 132, 0.7)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 235, 205, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieComponent;
