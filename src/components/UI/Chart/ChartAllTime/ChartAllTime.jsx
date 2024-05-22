/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

// Function to calculate the regression line
const calculateRegressionLine = (data) => {
  const n = data.length;
  if (n === 0) return [];

  const sumX = data.reduce((sum, point, index) => sum + index, 0);
  const sumY = data.reduce((sum, point) => sum + point.calculatedWpm, 0);
  const sumXY = data.reduce((sum, point, index) => sum + index * point.calculatedWpm, 0);
  const sumXX = data.reduce((sum, point, index) => sum + Math.pow(index, 2), 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - Math.pow(sumX, 2));
  const intercept = (sumY - slope * sumX) / n;

  const regressionLine = data.map((point, index) => ({
    x: index,
    y: slope * index + intercept,
  }));

  return regressionLine;
};

const ChartAllTime = ({ dataArray }) => {
  // const dateLabels = dataArray.map((data) => new Date(data.createdAt));
  const regressionLineData = calculateRegressionLine(dataArray);

  const nonZeroWpmData = dataArray.filter(data => data.calculatedWpm !== 0);
let dateLabels = nonZeroWpmData.map((data) => new Date(data.createdAt));
dateLabels = dateLabels.map((date) => date.toLocaleDateString());
console.log()
const data = {
  labels: dateLabels,
  datasets: [
    {
      label: 'WPM',
      data: nonZeroWpmData.map((data) => ({
        x: new Date(data.createdAt),
        y: data.calculatedWpm,
      })),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0, // HERE: set borderWidth to 0 to remove the line
        pointRadius: 3, // set the radius of the points
        pointBackgroundColor: 'rgba(255, 99, 132, 1)', // set the color of the points
        tension: 0.4,
      },
      {
        label: 'Regression Line',
        data: regressionLineData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        fill: false,
        borderDash: [5, 5],
        tension: 0.4,
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
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
      x: {
        type: 'category',
        time: {
          unit: 'month',
          displayFormats: {
            minute: 'MMM dd HH:mm',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'WPM',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartAllTime;
