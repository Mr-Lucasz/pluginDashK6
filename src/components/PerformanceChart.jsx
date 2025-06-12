import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import moment from "moment";
import styles from "./PerformanceChart.module.css";

function generateTimelineData(count, min, max) {
  const data = [];
  const now = new Date();
  for (let i = count; i > 0; i--) {
    const date = new Date(now);
    date.setHours(date.getHours() - i);
    data.push({
      x: date,
      y: Math.floor(Math.random() * (max - min + 1)) + min
    });
  }
  return data;
}

const PerformanceChart = ({ filter = "all" }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    let datasets = [
      {
        label: "Total Duration",
        data: generateTimelineData(24, 800, 1600),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4
      },
      {
        label: "Waiting (TTFB)",
        data: generateTimelineData(24, 400, 900),
        borderColor: "#8B5CF6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4
      },
      {
        label: "Blocked",
        data: generateTimelineData(24, 20, 100),
        borderColor: "#EF4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ];
    if (filter === "http") {
      datasets = datasets.filter(d => d.label === "Total Duration" || d.label === "Waiting (TTFB)");
    } else if (filter === "blocked") {
      datasets = datasets.filter(d => d.label === "Blocked");
    }
    const chart = new Chart(chartRef.current, {
      type: "line",
      data: { datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top" },
          tooltip: { mode: "index", intersect: false }
        },
        scales: {
          x: { type: "time", time: { unit: "hour" }, grid: { display: false } },
          y: { beginAtZero: true, title: { display: true, text: "Duration (ms)" } }
        },
        interaction: { mode: "nearest", axis: "x", intersect: false }
      }
    });
    return () => chart.destroy();
  }, [filter]);

  return <canvas ref={chartRef} className={styles.chart} />;
};

export default PerformanceChart;
