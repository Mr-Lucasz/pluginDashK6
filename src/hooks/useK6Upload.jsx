// src/hooks/useK6Upload.js
import { useState } from "react";

export default function useK6Upload() {
  const [uploadedData, setUploadedData] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorDetail, setErrorDetail] = useState("");

  const handleFileUpload = (e) => {
    setUploadError("");
    setUploadSuccess(false);
    setShowModal(false);
    setErrorDetail("");
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.endsWith('.json')) {
      setUploadError("Por favor, envie um arquivo .json gerado pelo k6.");
      setShowModal(true);
      setErrorDetail("Extensão de arquivo inválida.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        // ...parse logic (igual ao App.jsx)...
        let breakdownData = [];
        let performanceChart = null;
        let criticalMetrics = [];
        let endpoints = [];
        let percentileChart = null;
        let statusCodeChart = null;
        if (json.metrics) {
          const metrics = json.metrics;
          const durationKeys = [
            { key: 'http_req_blocked', label: 'Blocked', color: 'barBlue' },
            { key: 'http_req_connecting', label: 'Connecting', color: 'barIndigo' },
            { key: 'http_req_tls_handshaking', label: 'TLS Handshaking', color: 'barPurple' },
            { key: 'http_req_sending', label: 'Sending', color: 'barPink' },
            { key: 'http_req_waiting', label: 'Waiting', color: 'barRed' },
            { key: 'http_req_receiving', label: 'Receiving', color: 'barBlue' },
          ];
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
          breakdownData = breakdownData.filter(b => b.value > 0);
          if (metrics['http_req_connecting']?.avg > 500) {
            criticalMetrics.push({
              label: 'High Connection Time',
              value: `${Math.round(metrics['http_req_connecting'].avg)}ms`,
              key: 'http_req_connecting',
              icon: <i className="fas fa-clock text-red-500"></i>,
              badge: 'Critical',
              badgeColor: '#ef4444',
              description: `http_req_connecting: ${Math.round(metrics['http_req_connecting'].avg)}ms`,
            });
          }
          if (metrics['http_req_waiting']?.avg > 1000) {
            criticalMetrics.push({
              label: 'High Waiting Time',
              value: `${Math.round(metrics['http_req_waiting'].avg)}ms`,
              key: 'http_req_waiting',
              icon: <i className="fas fa-stopwatch text-orange-500"></i>,
              badge: 'Warning',
              badgeColor: '#f59e42',
              description: `http_req_waiting: ${Math.round(metrics['http_req_waiting'].avg)}ms`,
            });
          }
          if (metrics['http_req_failed'] && typeof metrics['http_req_failed'].value === 'number') {
            const errorRate = metrics['http_req_failed'].value * 100;
            if (errorRate > 1) {
              criticalMetrics.push({
                label: 'High Error Rate',
                value: `${errorRate.toFixed(2)}%`,
                key: 'http_req_failed',
                icon: <i className="fas fa-exclamation-triangle text-yellow-500"></i>,
                badge: 'Critical',
                badgeColor: '#ef4444',
                description: `Error Rate: ${errorRate.toFixed(2)}%`,
              });
            }
          }
          if (metrics['http_req_duration']) {
            endpoints.push({
              path: 'GET https://test.k6.io',
              avg: Math.round(metrics['http_req_duration'].avg || 0),
              p95: Math.round(metrics['http_req_duration']['p(95)'] || 0),
              p99: Math.round(metrics['http_req_duration']['p(99)'] || 0),
              rps: metrics['http_reqs']?.rate ? metrics['http_reqs'].rate.toFixed(2) : 'N/A',
              errorRate: metrics['http_req_failed']?.value ? (metrics['http_req_failed'].value * 100) : 0,
              successRate: metrics['http_req_failed']?.value ? (100 - metrics['http_req_failed'].value * 100) : 100,
              statusCodes: {
                '2xx': metrics['http_reqs']?.count || 0,
                '4xx': 0,
                '5xx': 0,
              },
            });
          }
          if (metrics['http_req_duration']) {
            percentileChart = {
              type: 'bar',
              data: {
                labels: ['p90', 'p95'],
                datasets: [
                  {
                    label: 'Percentile (ms)',
                    data: [
                      metrics['http_req_duration']['p(90)'],
                      metrics['http_req_duration']['p(95)'],
                    ],
                    backgroundColor: ['#6366f1', '#f59e42'],
                  },
                ],
              },
              options: {
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  y: { beginAtZero: true, title: { display: true, text: 'ms' } },
                  x: { title: { display: true, text: 'Percentile' } },
                },
              },
            };
          }
          if (metrics['http_reqs']) {
            statusCodeChart = {
              type: 'doughnut',
              data: {
                labels: ['2xx', '4xx', '5xx'],
                datasets: [
                  {
                    label: 'Status Codes',
                    data: [
                      metrics['http_reqs']?.count || 0,
                      0,
                      0,
                    ],
                    backgroundColor: ['#22c55e', '#f59e42', '#dc2626'],
                  },
                ],
              },
              options: {
                responsive: true,
                plugins: {
                  legend: { display: true },
                  title: { display: false },
                },
              },
            };
          }
        }
        let avgDuration = 0;
        if (breakdownData.length > 0) {
          avgDuration = breakdownData.reduce((acc, cur) => acc + cur.value, 0);
        } else if (json.metrics && json.metrics['http_req_duration']?.avg) {
          avgDuration = Math.round(json.metrics['http_req_duration'].avg);
        }
        setUploadedData({
          ...json,
          breakdownData,
          performanceChart,
          criticalMetrics,
          endpoints,
          percentileChart,
          statusCodeChart,
          avgDuration
        });
        setUploadSuccess(true);
      } catch (err) {
        setUploadError("Arquivo inválido ou corrompido.");
        setShowModal(true);
        setErrorDetail(err.message);
        console.error("Erro ao fazer upload do JSON:", err);
      }
    };
    reader.readAsText(file);
  };

  return {
    uploadedData,
    uploadError,
    uploadSuccess,
    showModal,
    errorDetail,
    setShowModal,
    setUploadSuccess,
    handleFileUpload,
  };
}
