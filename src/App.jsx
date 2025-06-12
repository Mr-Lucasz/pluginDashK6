import React, { useState } from "react";
import Header from "./components/layout/Header";
import SummaryCards from "./components/dashboard/SummaryCards";
import PerformanceChart from "./components/charts/PerformanceChart";
import MetricsBreakdown from "./components/dashboard/MetricsBreakdown";
import RequestDurationBreakdown from "./components/dashboard/RequestDurationBreakdown";
import PercentileChart from "./components/charts/PercentileChart";
import StatusCodeChart from "./components/charts/StatusCodeChart";
import ApiEndpointBreakdown from "./components/dashboard/ApiEndpointBreakdown";
import UploadErrorModal from "./components/modals/UploadErrorModal";
import UploadSuccessModal from "./components/modals/UploadSuccessModal";
import useK6Upload from "./hooks/useK6Upload.jsx";
import styles from "./App.module.css";
import "./index.css";

const App = () => {
  const [filter, setFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    uploadedData,
    uploadError,
    uploadSuccess,
    showModal,
    errorDetail,
    setShowModal,
    setUploadSuccess,
    handleFileUpload,
  } = useK6Upload();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1200);
  };

  return (
    <div className={styles.root}>
      <Header
        id="header"
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onFileUpload={handleFileUpload}
        uploadError={uploadError}
        uploadSuccess={uploadSuccess}
      />
      <section className={styles.section} id="summary-cards-section">
        <div className={styles.gridSummary} id="summary-cards-grid">
          <SummaryCards k6Data={uploadedData} id="summary-cards" />
        </div>
      </section>
      <section className={styles.section} id="main-dashboard-section">
        <div className={styles.gridMain} id="main-dashboard-grid">
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
          <MetricsBreakdown metrics={uploadedData?.criticalMetrics} predictions={uploadedData?.predictions} id="metrics-breakdown" />
        </div>
      </section>
      <section className={styles.section} id="detailed-metrics-section">
        <h2 className={styles.sectionTitle} id="detailed-metrics-title">Detailed HTTP Metrics</h2>
        <ApiEndpointBreakdown endpoints={uploadedData?.endpoints} id="api-endpoint-breakdown" />
        <div className={styles.gridDetailed} id="detailed-metrics-grid">
          <RequestDurationBreakdown breakdownData={uploadedData?.breakdownData} avgDuration={uploadedData?.avgDuration} id="request-duration-breakdown" />
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
              <div className={styles.cardSecondaryBadge} id="status-code-distribution-badge">
                Total: {uploadedData?.endpoints && uploadedData.endpoints.length > 0 ? uploadedData.endpoints[0].statusCodes['2xx'] + uploadedData.endpoints[0].statusCodes['4xx'] + uploadedData.endpoints[0].statusCodes['5xx'] : 0}
              </div>
            </div>
            <div className={styles.cardSecondaryChart} id="status-code-distribution-chart-container">
              <StatusCodeChart chartData={uploadedData?.statusCodeChart} id="status-code-distribution-chart" />
            </div>
          </div>
        </div>
      </section>
      <UploadErrorModal show={showModal} error={uploadError} detail={errorDetail} onClose={() => setShowModal(false)} />
      <UploadSuccessModal show={uploadSuccess} onClose={() => setUploadSuccess(false)} />
    </div>
  );
};

export default App;
