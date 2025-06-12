import React from "react";
import styles from "./ApiEndpointBreakdown.module.css";

// Dados simulados para endpoints
const endpoints = [
  {
    path: "/login",
    avg: 320,
    p95: 600,
    p99: 900,
    rps: 120,
    errorRate: 0.2,
    successRate: 99.8,
    statusCodes: { "2xx": 118, "4xx": 1, "5xx": 1 }
  },
  {
    path: "/users",
    avg: 210,
    p95: 400,
    p99: 700,
    rps: 80,
    errorRate: 0.5,
    successRate: 99.5,
    statusCodes: { "2xx": 78, "4xx": 1, "5xx": 1 }
  },
  {
    path: "/orders",
    avg: 450,
    p95: 900,
    p99: 1200,
    rps: 60,
    errorRate: 1.2,
    successRate: 98.8,
    statusCodes: { "2xx": 58, "4xx": 1, "5xx": 1 }
  }
];

const ApiEndpointBreakdown = () => {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Desempenho por Endpoint</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Avg (ms)</th>
            <th>p95 (ms)</th>
            <th>p99 (ms)</th>
            <th>RPS</th>
            <th>Erro (%)</th>
            <th>Sucesso (%)</th>
            <th>Status Codes</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((ep) => (
            <tr key={ep.path}>
              <td>{ep.path}</td>
              <td>{ep.avg}</td>
              <td>{ep.p95}</td>
              <td>{ep.p99}</td>
              <td>{ep.rps}</td>
              <td style={{ color: ep.errorRate > 1 ? '#dc2626' : '#64748b' }}>{ep.errorRate.toFixed(2)}</td>
              <td style={{ color: ep.successRate < 99 ? '#dc2626' : '#22c55e' }}>{ep.successRate.toFixed(2)}</td>
              <td>
                <span style={{ color: '#22c55e' }}>{ep.statusCodes["2xx"]}x2xx</span>{" "}
                <span style={{ color: '#f59e42' }}>{ep.statusCodes["4xx"]}x4xx</span>{" "}
                <span style={{ color: '#dc2626' }}>{ep.statusCodes["5xx"]}x5xx</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiEndpointBreakdown;
