/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ResultChart = ({ result }) => {
    if (!result) {
        return null;
      }
  const errors = Array(result.time).fill(0);

  result.mistakes.forEach((mistake) => {
    errors[mistake.time - 1]++;
    
  });

  const filteredErrors = errors.map((error) => error === 0 ? null : error);
  // console.log(filteredErrors);
  const data = {
    labels: Array.from({ length: result.time }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Wpm',
        data: result.wpmArray,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Raw wpm',
        data: result.rawWpmArray,
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Errors',
        data: filteredErrors,
        borderColor: '#ec4c56',
        backgroundColor: '#ec4c56',
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHitRadius: 10,
        fill: false,
        showLine: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'the last test passed',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y || '';
            return label + ': ' + value;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ResultChart;
