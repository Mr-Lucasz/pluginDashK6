import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import styles from "./StatusCodeChart.module.css";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const StatusCodeChart = ({ chartData, isLoading, isError }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: ["2xx", "3xx", "4xx", "5xx"],
        datasets: [{
          data: [235000, 8000, 2700, 1089],
          backgroundColor: [
            "rgba(16, 185, 129, 0.7)",
            "rgba(59, 130, 246, 0.7)",
            "rgba(245, 158, 11, 0.7)",
            "rgba(239, 68, 68, 0.7)"
          ],
          borderColor: [
            "rgba(16, 185, 129, 1)",
            "rgba(59, 130, 246, 1)",
            "rgba(245, 158, 11, 1)",
            "rgba(239, 68, 68, 1)"
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "right" },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.raw || 0;
                const percentage = Math.round((value / 246789) * 100);
                return `${label}: ${value.toLocaleString()} (${percentage}%)`;
              }
            }
          }
        },
        cutout: "70%"
      }
    });
    return () => chart.destroy();
  }, []);

  if (isLoading) return <LoadingState message="Carregando status codes..." />;
  if (isError) return <ErrorState message="Erro ao carregar status codes." />;
  const isEmpty = !chartData || !chartData.datasets || chartData.datasets[0].data.every(v => v === 0);
  if (isEmpty) {
    return <EmptyState message="Nenhum dado de status code disponível." />;
  }

  return <canvas ref={chartRef} className={styles.chart} />;
};

export default StatusCodeChart;
