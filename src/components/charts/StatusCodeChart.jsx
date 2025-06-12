import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import styles from "./StatusCodeChart.module.css";
import EmptyState from "../states/EmptyState";
import LoadingState from "../states/LoadingState";
import ErrorState from "../states/ErrorState";

const StatusCodeChart = ({ chartData, isLoading, isError }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !chartData) return;
    const chart = new Chart(chartRef.current, chartData);
    return () => chart.destroy();
  }, [chartData]);

  if (isLoading) return <LoadingState message="Carregando status codes..." />;
  if (isError) return <ErrorState message="Erro ao carregar status codes." />;
  if (!chartData) return <EmptyState message="Nenhum dado de status code disponível." />;

  return <canvas ref={chartRef} className={styles.chart} />;
};

export default StatusCodeChart;
