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

  // Simulação de refresh (pode ser expandido para atualizar dados reais)
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Aqui você pode atualizar dados do dashboard
    }, 1200);
  };

  const percentileChartData = {
    labels: ["p50", "p75", "p90", "p95", "p99"],
    data: [950, 1350, 1750, 2050, 2450]
  };
  const statusCodeChartData = {
    labels: ["2xx", "3xx", "4xx", "5xx"],
    datasets: [
      {
        data: [235000, 8000, 2700, 1089],
        backgroundColor: [
          "rgba(16, 185, 129, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(239, 68, 68, 0.7)"
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className={styles.root}>
      {/* Header */}
      <Header
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Summary Cards */}
      <section className={styles.section}>
        <div className={styles.gridSummary}>
          <SummaryCards />
        </div>
      </section>

      {/* Main Dashboard */}
      <section className={styles.section}>
        <div className={styles.gridMain}>
          {/* Main Performance Chart */}
          <div style={{ background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 'bold', color: '#1e293b' }}>Performance Overview</h2>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  style={{
                    padding: '0.25rem 0.75rem',
                    background: filter === 'http' ? '#2563eb' : '#f3f4f6',
                    borderRadius: 8,
                    color: filter === 'http' ? '#fff' : '#374151',
                    fontSize: 14,
                    fontWeight: 500,
                    border: 'none',
                    transition: 'background 0.2s, color 0.2s'
                  }}
                  onClick={() => setFilter('http')}
                >
                  HTTP Duration
                </button>
                <button
                  style={{
                    padding: '0.25rem 0.75rem',
                    background: filter === 'blocked' ? '#2563eb' : '#f3f4f6',
                    borderRadius: 8,
                    color: filter === 'blocked' ? '#fff' : '#374151',
                    fontSize: 14,
                    fontWeight: 500,
                    border: 'none',
                    transition: 'background 0.2s, color 0.2s'
                  }}
                  onClick={() => setFilter('blocked')}
                >
                  Blocked Time
                </button>
                <button
                  style={{
                    padding: '0.25rem 0.75rem',
                    background: filter === 'all' ? '#2563eb' : '#f3f4f6',
                    borderRadius: 8,
                    color: filter === 'all' ? '#fff' : '#374151',
                    fontSize: 14,
                    fontWeight: 500,
                    border: 'none',
                    transition: 'background 0.2s, color 0.2s'
                  }}
                  onClick={() => setFilter('all')}
                >
                  All Metrics
                </button>
              </div>
            </div>
            <div style={{ height: '28rem', width: '100%' }}>
              <PerformanceChart filter={filter} />
            </div>
          </div>
          {/* Metrics Breakdown abaixo do Performance Overview */}
          <MetricsBreakdown />
        </div>
      </section>

      {/* Detailed Metrics Section */}
      <section className={styles.section}>
        <h2 style={{ fontSize: 20, fontWeight: 'bold', color: '#1e293b', marginBottom: 24 }}>Detailed HTTP Metrics</h2>
        {/* Nova seção: Desempenho por Endpoint */}
        <ApiEndpointBreakdown />
        <div className={styles.gridDetailed}>
          <RequestDurationBreakdown />
          <div style={{ background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontWeight: 600, color: '#374151' }}>Percentile Performance</h3>
              <div style={{ fontSize: 12, background: '#f3f4f6', color: '#4b5563', padding: '0.25rem 0.5rem', borderRadius: 9999 }}>p95 Threshold: 2,100ms</div>
            </div>
            <div style={{ height: '16rem', width: '100%' }}>
              <PercentileChart chartData={percentileChartData} />
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontWeight: 600, color: '#374151' }}>Status Code Distribution</h3>
              <div style={{ fontSize: 12, background: '#f3f4f6', color: '#4b5563', padding: '0.25rem 0.5rem', borderRadius: 9999 }}>Total: 246,789</div>
            </div>
            <div style={{ height: '16rem', width: '100%' }}>
              <StatusCodeChart chartData={statusCodeChartData} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
