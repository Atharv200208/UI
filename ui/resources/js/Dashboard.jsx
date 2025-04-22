import React, { useEffect, useState } from "react";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Existing Chart Data
const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [12000, 15000, 14000, 17000, 18000, 20000],
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      tension: 0.4,
    },
  ],
};

const barData = {
  labels: ["Product A", "Product B", "Product C", "Product D"],
  datasets: [
    {
      label: "Sales",
      data: [300, 500, 400, 700],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const pieData = {
  labels: ["Apple", "Samsung", "Nothing"],
  datasets: [
    {
      label: "Votes",
      data: [12, 19, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// New Chart Data
const fineCategoryData = {
  labels: ["Furniture", "Electrical", "Walls", "Plumbing"],
  datasets: [
    {
      data: [300, 200, 150, 100],
      backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
      borderWidth: 1,
    },
  ],
};

const fineTrendData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Fines Over Time",
      data: [500, 300, 450, 200, 100],
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      tension: 0.4,
    },
  ],
};

const depositVsFineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Deposits",
      data: [1000, 1200, 800, 1500, 1300],
      backgroundColor: "#36a2eb",
    },
    {
      label: "Fines",
      data: [1000, 1200, 800, 1500, 1300],
      backgroundColor: "#ff6384",
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 3000,
    easing: "easeInOutQuart",
  },
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h3>Loading History...</h3>
      </div>
    );
  }

  return (
    <div className="container my-5 animate__animated animate__fadeIn">
      <h2 className="text-center mb-4">History</h2>

      <div className="row g-4">
        {/* Line Chart */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5 className="card-title text-center">Revenue Over Months</h5>
            <div style={{ height: "300px" }}>
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5 className="card-title text-center">Sales by Product</h5>
            <div style={{ height: "300px" }}>
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-md-8 offset-md-2">
          <div className="card shadow-sm p-4">
            <h5 className="card-title text-center">Votes Distribution</h5>
            <div className="row">
              <div className="col-md-6">
                <div style={{ height: "300px" }}>
                  <Pie data={pieData} options={chartOptions} />
                </div>
              </div>
              <div className="col-md-6 d-flex flex-column justify-content-center">
                {pieData.labels.map((label, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                    <strong>{label}</strong>
                    <span className="badge bg-primary">{pieData.datasets[0].data[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fine Category Doughnut Chart */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5 className="card-title text-center">Fine Breakdown by Category</h5>
            <div style={{ height: "300px" }}>
              <Doughnut data={fineCategoryData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Fines Over Time Line/Area Chart */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5 className="card-title text-center">Fines Over Time</h5>
            <div style={{ height: "300px" }}>
              <Line data={fineTrendData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Deposits vs Fines Comparison Bar Chart */}
        <div className="col-md-10 offset-md-1">
          <div className="card shadow-sm p-4">
            <h5 className="card-title text-center">Deposits vs Fines (Monthly)</h5>
            <div style={{ height: "350px" }}>
              <Bar data={depositVsFineData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
