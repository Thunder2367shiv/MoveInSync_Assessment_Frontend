import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RuleImpactChart = ({ data }) => {
  const labels = data.map(d => d._id);
  const counts = data.map(d => d.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Alerts Triggered",
        data: counts,
        backgroundColor: "rgba(65, 105, 225, 0.6)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 border">
      <h3 className="text-gray-700 font-semibold text-sm mb-3">
        Rule Impact — Which Rules Trigger Most Alerts
      </h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RuleImpactChart;
