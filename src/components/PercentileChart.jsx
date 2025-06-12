import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import styles from "./PercentileChart.module.css";

const PercentileChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: ["p50", "p75", "p90", "p95", "p99"],
        datasets: [{
          label: "Response Time (ms)",
          data: [950, 1350, 1750, 2050, 2450],
          backgroundColor: [
            "rgba(59, 130, 246, 0.7)",
            "rgba(139, 92, 246, 0.7)",
            "rgba(239, 68, 68, 0.7)",
            "rgba(245, 158, 11, 0.7)",
            "rgba(16, 185, 129, 0.7)"
          ],
          borderColor: [
            "rgba(59, 130, 246, 1)",
            "rgba(139, 92, 246, 1)",
            "rgba(239, 68, 68, 1)",
            "rgba(245, 158, 11, 1)",
            "rgba(16, 185, 129, 1)"
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.raw}ms`;
              }
            }
          }
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: "Duration (ms)" } }
        }
      }
    });
    return () => chart.destroy();
  }, []);

  return <canvas ref={chartRef} className={styles.chart} />;
};

export default PercentileChart;
