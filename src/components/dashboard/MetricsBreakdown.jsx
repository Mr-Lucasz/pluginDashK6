import React from "react";
import styles from "./MetricsBreakdown.module.css";
import EmptyState from "../states/EmptyState";
import LoadingState from "../states/LoadingState";
import ErrorState from "../states/ErrorState";

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
        <div className={styles.criticalList}>
          {metrics.map((m, idx) => (
            <div key={m.key || idx} className={styles.criticalItem}>
              <div className={styles.criticalIcon}>{m.icon}</div>
              <div>
                <div className={styles.criticalLabel}>{m.label}</div>
                <div className={styles.criticalValue}>{m.value}</div>
                {m.description && <div className={styles.criticalBadge}>{m.description}</div>}
              </div>
              <span className={styles.criticalBadge} style={{background: m.badgeColor || '#fee2e2', color: '#b91c1c'}}>{m.badge}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MetricsBreakdown;
