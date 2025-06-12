import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import moment from "moment";
import styles from "./PerformanceChart.module.css";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const PerformanceChart = ({ filter = "all", chartData, isLoading, isError }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !chartData) return;
    const chart = new Chart(chartRef.current, chartData);
    return () => chart.destroy();
  }, [filter, chartData]);

  if (isLoading) return <LoadingState message="Carregando gráfico de performance..." />;
  if (isError) return <ErrorState message="Erro ao carregar gráfico de performance." />;
  if (!chartData) return <EmptyState message="Nenhum dado de performance disponível." />;

  return <canvas ref={chartRef} className={styles.chart} />;
};

export default PerformanceChart;
