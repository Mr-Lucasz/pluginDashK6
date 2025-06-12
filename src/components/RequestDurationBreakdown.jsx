import React from "react";
import styles from "./RequestDurationBreakdown.module.css";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const breakdownDataDefault = [
  { label: "Waiting (TTFB)", value: 680, percent: 55, color: "barBlue" },
  { label: "Receiving", value: 320, percent: 26, color: "barIndigo" },
  { label: "Sending", value: 120, percent: 10, color: "barPurple" },
  { label: "Connecting", value: 85, percent: 7, color: "barPink" },
  { label: "Blocked", value: 35, percent: 3, color: "barRed" },
];

const RequestDurationBreakdown = ({ breakdownData, isLoading, isError }) => {
  if (isLoading) return <LoadingState message="Carregando breakdown..." />;
  if (isError) return <ErrorState message="Erro ao carregar breakdown." />;
  const data = breakdownData || breakdownDataDefault;
  if (!data || data.length === 0) {
    return <EmptyState message="Nenhum dado de duração de requisição." />;
  }
  return (
    <div className={styles.card}>
      <div className={styles.flexBetween}>
        <h3 className={styles.title}>Request Duration Breakdown</h3>
        <div className={styles.badge}>Avg. 1,240ms</div>
      </div>
      <div className={styles.spaceY2}>
        {data.map((item) => (
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
        ))}
      </div>
    </div>
  );
};

export default RequestDurationBreakdown;
