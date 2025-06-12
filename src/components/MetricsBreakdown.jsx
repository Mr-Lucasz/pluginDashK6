import React from "react";
import { FaChartLine, FaInfoCircle, FaClock, FaStopwatch, FaDownload } from "react-icons/fa";
import styles from "./MetricsBreakdown.module.css";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const predictions = [
  {
    label: "Peak Load Time",
    value: "1,450ms",
    percent: 78,
    tooltip: "Based on current trends, expected peak load time would reach 1,450ms in the next 24 hours"
  },
  {
    label: "Error Rate Increase",
    value: "+4.2%",
    percent: 42,
    tooltip: "Predicted error rate increase under current user growth patterns"
  },
  {
    label: "Throughput Capacity",
    value: "82%",
    percent: 82,
    tooltip: "Current capacity utilization with 15% buffer for traffic spikes"
  }
];

const criticalMetrics = [
  {
    icon: <FaClock style={{ color: '#ef4444' }} />,
    iconBg: styles.criticalIcon,
    title: "High Connection Time",
    value: "http_req_connecting: 850ms",
    badge: "Critical",
    badgeClass: styles.criticalBadge
  },
  {
    icon: <FaStopwatch style={{ color: '#f59e0b' }} />,
    iconBg: styles.criticalIcon,
    title: "Blocked Requests",
    value: "http_req_blocked: 420ms",
    badge: "Warning",
    badgeClass: styles.criticalBadge
  },
  {
    icon: <FaDownload style={{ color: '#3b82f6' }} />,
    iconBg: styles.criticalIcon,
    title: "Slow Response Time",
    value: "http_req_receiving: 320ms",
    badge: "Monitor",
    badgeClass: styles.criticalBadge
  }
];

const MetricsBreakdown = ({ isLoading, isError }) => {
  const [tooltip, setTooltip] = React.useState({ show: false, text: '', x: 0, y: 0 });

  const handleMouseEnter = (e, text) => {
    const rect = e.target.getBoundingClientRect();
    setTooltip({ show: true, text, x: rect.left + rect.width / 2, y: rect.top });
  };
  const handleMouseLeave = () => setTooltip({ show: false, text: '', x: 0, y: 0 });

  const hasPredictions = predictions && predictions.length > 0;
  const hasCritical = criticalMetrics && criticalMetrics.length > 0;

  if (isLoading) return <LoadingState message="Carregando métricas..." />;
  if (isError) return <ErrorState message="Erro ao carregar métricas." />;

  return (
    <div className={styles.card} style={{ position: 'relative' }}>
      <h2 className={styles.title}>Metrics Breakdown</h2>
      {/* Predictions Widget */}
      <div className={styles.predictionWidget}>
        <div className={styles.predictionTitle}>
          <FaChartLine style={{ color: '#6366f1', marginRight: 8 }} />
          <span>Performance Predictions</span>
        </div>
        <div>
          {!hasPredictions ? (
            <EmptyState message="Nenhuma previsão disponível." />
          ) : (
            predictions.map((pred) => (
              <div key={pred.label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={styles.predictionLabel}>{pred.label}</span>
                  <span className={styles.predictionValue} style={{ position: 'relative' }}>
                    {pred.value} 
                    <span
                      onMouseEnter={e => handleMouseEnter(e, pred.tooltip)}
                      onMouseLeave={handleMouseLeave}
                      style={{ display: 'inline-block' }}
                    >
                      <FaInfoCircle style={{ marginLeft: 4, color: '#6366f1', cursor: 'pointer' }} />
                    </span>
                  </span>
                </div>
                <div className={styles.predictionBarBg}>
                  <div className={styles.predictionBar} style={{ width: `${pred.percent}%` }}></div>
                </div>
              </div>
            ))
          )}
        </div>
        {tooltip.show && (
          <div
            style={{
              position: 'fixed',
              left: tooltip.x,
              top: tooltip.y - 40,
              background: '#1f2937',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: 6,
              fontSize: 13,
              zIndex: 1000,
              whiteSpace: 'pre-line',
              pointerEvents: 'none',
              transform: 'translate(-50%, -100%)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
      {/* Critical Metrics */}
      <div>
        <h3 className={styles.criticalTitle}>Critical Metrics</h3>
        <div className={styles.criticalList}>
          {!hasCritical ? (
            <EmptyState message="Nenhum dado crítico disponível." />
          ) : (
            criticalMetrics.map((metric) => (
              <div className={styles.criticalItem} key={metric.title}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className={metric.iconBg}>{metric.icon}</div>
                  <div>
                    <p className={styles.criticalLabel}>{metric.title}</p>
                    <p className={styles.criticalValue}>{metric.value}</p>
                  </div>
                </div>
                <span className={metric.badgeClass}>{metric.badge}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricsBreakdown;
