import React from "react";
import styles from "./RequestDurationBreakdown.module.css";
import EmptyState from "../states/EmptyState";
import LoadingState from "../states/LoadingState";
import ErrorState from "../states/ErrorState";

const RequestDurationBreakdown = ({ breakdownData, isLoading, isError, avgDuration }) => {
  if (isLoading) return <LoadingState message="Carregando breakdown..." />;
  if (isError) return <ErrorState message="Erro ao carregar breakdown." />;

  return (
    <div className={styles.card}>
      <div className={styles.flexBetween}>
        <h3 className={styles.title}>Request Duration Breakdown</h3>
        <div className={styles.badge}>Avg. {typeof breakdownData !== 'undefined' && breakdownData.length > 0 && typeof breakdownData[0].value === 'number' ? (avgDuration || breakdownData.reduce((acc, cur) => acc + cur.value, 0)) + 'ms' : 'N/A'}</div>
      </div>
      <div className={styles.spaceY2}>
        {(!breakdownData || breakdownData.length === 0) ? (
          <EmptyState message="Nenhum dado de duração de requisição." />
        ) : (
          breakdownData.map((item) => (
            <React.Fragment key={item.label}>
              <div className={styles.flexBetween}>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value}>{item.value}ms</span>
              </div>
              <div className={styles.barBg}>
                <div
                  className={`${styles.bar} ${styles[item.color]}`}
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default RequestDurationBreakdown;
