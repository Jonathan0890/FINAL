import { Chart } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  BarController, 
  PieController, 
  LinearScale, 
  CategoryScale,
  ArcElement,
  BarElement,
  Legend,
  Tooltip
} from 'chart.js';

ChartJS.register(
  BarController,
  PieController,
  LinearScale,
  CategoryScale,
  ArcElement,
  BarElement,
  Legend,
  Tooltip
);

const FinancialChart = ({ type, data, options, ariaLabel }) => {
  return <Chart type={type} data={data} options={options} aria-label={ariaLabel} />;
};

export default FinancialChart;