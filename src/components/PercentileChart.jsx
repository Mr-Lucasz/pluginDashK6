import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import styles from "./PercentileChart.module.css";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const PercentileChart = ({ chartData, isLoading, isError }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !chartData) return;
    const chart = new Chart(chartRef.current, chartData);
    return () => chart.destroy();
  }, [chartData]);

  if (isLoading) return <LoadingState message="Carregando percentis..." />;
  if (isError) return <ErrorState message="Erro ao carregar percentis." />;
  if (!chartData) return <EmptyState message="Nenhum dado de percentil disponível." />;

  return <canvas ref={chartRef} className={styles.chart} />;
};

export default PercentileChart;
