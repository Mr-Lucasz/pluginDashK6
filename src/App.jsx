import React, { useState } from "react";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import PerformanceChart from "./components/PerformanceChart";
import MetricsBreakdown from "./components/MetricsBreakdown";
import RequestDurationBreakdown from "./components/RequestDurationBreakdown";
import PercentileChart from "./components/PercentileChart";
import StatusCodeChart from "./components/StatusCodeChart";
import ApiEndpointBreakdown from "./components/ApiEndpointBreakdown";
import styles from "./App.module.css";
import "./index.css";

const App = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filter, setFilter] = useState("all");
  const [uploadedData, setUploadedData] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Função de upload e parse do arquivo JSON
  const handleFileUpload = (e) => {
    setUploadError("");
    setUploadSuccess(false);
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.endsWith('.json')) {
      setUploadError("Por favor, envie um arquivo .json gerado pelo k6.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        // Monta breakdownData a partir dos dados do k6
        let breakdownData = [];
        if (json.metrics) {
          const metrics = json.metrics;
          // Exemplo de métricas de duração
          const durationKeys = [
            { key: 'http_req_blocked', label: 'Blocked', color: 'barBlue' },
            { key: 'http_req_connecting', label: 'Connecting', color: 'barIndigo' },
            { key: 'http_req_tls_handshaking', label: 'TLS Handshaking', color: 'barPurple' },
            { key: 'http_req_sending', label: 'Sending', color: 'barPink' },
            { key: 'http_req_waiting', label: 'Waiting', color: 'barRed' },
            { key: 'http_req_receiving', label: 'Receiving', color: 'barBlue' },
          ];
          // Pega o valor médio de cada métrica
          let total = 0;
          const values = durationKeys.map(({ key }) => {
            const v = metrics[key]?.avg || 0;
            total += v;
            return v;
          });
          breakdownData = durationKeys.map((item, idx) => ({
            label: item.label,
            value: Math.round(values[idx]),
            percent: total ? Math.round((values[idx] / total) * 100) : 0,
            color: item.color,
          }));
          // Remove itens zerados
          breakdownData = breakdownData.filter(b => b.value > 0);
        }
        setUploadedData({ ...json, breakdownData });
        setUploadSuccess(true);
      } catch (err) {
        setUploadError("Arquivo inválido ou corrompido.");
      }
    };
    reader.readAsText(file);
  };

  // Simulação de refresh (pode ser expandido para atualizar dados reais)
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Aqui você pode atualizar dados do dashboard
    }, 1200);
  };

  return (
    <div className={styles.root}>
      {/* Header */}
      <Header
        id="header"
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onFileUpload={handleFileUpload}
        uploadError={uploadError}
        uploadSuccess={uploadSuccess}
      />
      {/* Summary Cards */}
      <section className={styles.section} id="summary-cards-section">
        <div className={styles.gridSummary} id="summary-cards-grid">
          <SummaryCards data={uploadedData?.summaryCards} id="summary-cards" />
        </div>
      </section>
      {/* Main Dashboard */}
      <section className={styles.section} id="main-dashboard-section">
        <div className={styles.gridMain} id="main-dashboard-grid">
          {/* Main Performance Chart */}
          <div className={styles.cardMain + ' ' + styles.cardMainFull} id="main-performance-card">
            <div className={styles.cardHeader} id="main-performance-header">
              <h2 className={styles.cardTitle} id="main-performance-title">Performance Overview</h2>
              <div className={styles.cardHeaderBtns} id="main-performance-filters">
                <button
                  className={filter === 'http' ? `${styles.filterButton} ${styles.filterButtonActive}` : styles.filterButton}
                  onClick={() => setFilter('http')}
                  id="filter-http"
                >
                  HTTP Duration
                </button>
                <button
                  className={filter === 'blocked' ? `${styles.filterButton} ${styles.filterButtonActive}` : styles.filterButton}
                  onClick={() => setFilter('blocked')}
                  id="filter-blocked"
                >
                  Blocked Time
                </button>
                <button
                  className={filter === 'all' ? `${styles.filterButton} ${styles.filterButtonActive}` : styles.filterButton}
                  onClick={() => setFilter('all')}
                  id="filter-all"
                >
                  All Metrics
                </button>
              </div>
            </div>
            <div style={{ height: '28rem', width: '100%' }} id="main-performance-chart-container">
              <PerformanceChart filter={filter} chartData={uploadedData?.performanceChart} id="main-performance-chart" />
            </div>
          </div>
          {/* Metrics Breakdown abaixo do Performance Overview */}
          <MetricsBreakdown metrics={uploadedData?.criticalMetrics} predictions={uploadedData?.predictions} id="metrics-breakdown" />
        </div>
      </section>
      {/* Detailed Metrics Section */}
      <section className={styles.section} id="detailed-metrics-section">
        <h2 className={styles.sectionTitle} id="detailed-metrics-title">Detailed HTTP Metrics</h2>
        {/* Nova seção: Desempenho por Endpoint */}
        <ApiEndpointBreakdown endpoints={uploadedData?.endpoints} id="api-endpoint-breakdown" />
        <div className={styles.gridDetailed} id="detailed-metrics-grid">
          <RequestDurationBreakdown breakdownData={uploadedData?.breakdownData} id="request-duration-breakdown" />
          <div className={styles.cardSecondary} id="percentile-performance-card">
            <div className={styles.cardSecondaryHeader} id="percentile-performance-header">
              <h3 className={styles.cardSecondaryTitle} id="percentile-performance-title">% Performance</h3>
              <div className={styles.cardSecondaryBadge} id="percentile-performance-badge">p95 Threshold: 2,100ms</div>
            </div>
            <div className={styles.cardSecondaryChart} id="percentile-performance-chart-container">
              <PercentileChart chartData={uploadedData?.percentileChart} id="percentile-performance-chart" />
            </div>
          </div>
          <div className={styles.cardSecondary} id="status-code-distribution-card">
            <div className={styles.cardSecondaryHeader} id="status-code-distribution-header">
              <h3 className={styles.cardSecondaryTitle} id="status-code-distribution-title">Status Code Distribution</h3>
              <div className={styles.cardSecondaryBadge} id="status-code-distribution-badge">Total: 246,789</div>
            </div>
            <div className={styles.cardSecondaryChart} id="status-code-distribution-chart-container">
              <StatusCodeChart chartData={uploadedData?.statusCodeChart} id="status-code-distribution-chart" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
