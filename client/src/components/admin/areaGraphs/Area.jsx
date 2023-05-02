
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';



const AreaComponent = ({dates, step}) => {
    
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Post in ${[Object.keys(dates[step])][0]}`,
      },
    },
  };
  
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  
   const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Posts',
        data: Object.values(dates[step][Object.keys(dates[step])[0]]),
        borderColor: 'var(--main-page-color)',
        backgroundColor: 'rgba(53, 235, 208, 0.5)',
      },
    ],
  };
  
  return <Line options={options} data={data} />
}

export default AreaComponent