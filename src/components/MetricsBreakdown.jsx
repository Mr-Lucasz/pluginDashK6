import React from "react";
import styles from "./MetricsBreakdown.module.css";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const MetricsBreakdown = ({ isLoading, isError, metrics, predictions }) => {
  return (
    <div className={styles.card} style={{ position: 'relative' }}>
      <h3 className={styles.title}>Critical Metrics Breakdown</h3>
      {isLoading ? (
        <LoadingState message="Carregando métricas..." />
      ) : isError ? (
        <ErrorState message="Erro ao carregar métricas." />
      ) : (!metrics || metrics.length === 0) ? (
        <EmptyState message="Nenhum dado crítico disponível." />
      ) : (
        // Renderização dinâmica das métricas e previsões do upload
        // ...
        null
      )}
    </div>
  );
};

export default MetricsBreakdown;
