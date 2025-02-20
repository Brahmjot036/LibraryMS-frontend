"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/dashboard_data");
        const data = res.data;
        const preparedData = {
          labels: ["Issued Books", "Available Books"],
          datasets: [
            {
              label: "Books",
              data: [data.issued_books, data.total_books - data.issued_books],
              backgroundColor: ["#F59E0B", "#3B82F6"],
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#ffffff",
            },
          ],
        };
        setChartData(preparedData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }
    fetchDashboardData();
  }, []);

  if (!chartData)
    return (
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-xl shadow-lg text-center">
        <p className="text-lg font-semibold text-gray-700">Loading chart data...</p>
      </div>
    );

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-2xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Books Overview
      </h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top", labels: { font: { size: 14 } } },
            title: {
              display: true,
              text: "Issued vs Available Books",
              font: { size: 18, weight: "bold" },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { font: { size: 12 } },
              grid: { color: "#e0e0e0" },
            },
            x: {
              ticks: { font: { size: 12 } },
              grid: { display: false },
            },
          },
        }}
      />
    </div>
  );
}
