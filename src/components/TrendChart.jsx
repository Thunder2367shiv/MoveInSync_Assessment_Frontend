import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const TrendChart = ({ history }) => {
  const labels = history.map((h) => h._id);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Alerts",
        data: history.map((h) => h.total),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.15)",
        fill: true,
        tension: 0.3,
      },

      {
        label: "Escalations",
        data: history.map((h) => h.escalated),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.15)",
        fill: true,
        tension: 0.3,
      },

      {
        label: "Auto-Closed",
        data: history.map((h) => h.autoclosed),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.15)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#eee" } },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <h3 className="text-gray-700 font-semibold text-sm mb-3">
        Alert Trend
      </h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default TrendChart;
