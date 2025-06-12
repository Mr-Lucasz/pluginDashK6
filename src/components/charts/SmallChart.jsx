import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styles from "./SmallChart.module.css";

const SmallChart = ({ color, data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: Array.from({ length: 12 }, (_, i) => i),
        datasets: [{
          data,
          borderColor: color,
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } }
      }
    });
    return () => chart.destroy();
  }, [data, color]);

  return <canvas ref={chartRef} className={styles.chart} />;
};

export default SmallChart;
