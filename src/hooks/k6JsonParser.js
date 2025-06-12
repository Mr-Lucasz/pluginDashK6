// src/hooks/k6JsonParser.js
// Função responsável por parsear o JSON do k6 e retornar os dados prontos para o dashboard

// Função auxiliar para criticalMetrics
function parseCriticalMetrics(metrics) {
  const rules = [
    {
      condition: (m) => m["http_req_connecting"]?.avg > 500,
      build: (m) => ({
        label: "High Connection Time",
        value: `${Math.round(m["http_req_connecting"].avg)}ms`,
        key: "http_req_connecting",
        icon: '<i class="fas fa-clock text-red-500"></i>',
        badge: "Critical",
        badgeColor: "#ef4444",
        description: `http_req_connecting: ${Math.round(
          m["http_req_connecting"].avg
        )}ms`,
      }),
    },
    {
      condition: (m) => m["http_req_waiting"]?.avg > 1000,
      build: (m) => ({
        label: "High Waiting Time",
        value: `${Math.round(m["http_req_waiting"].avg)}ms`,
        key: "http_req_waiting",
        icon: '<i class="fas fa-stopwatch text-orange-500"></i>',
        badge: "Warning",
        badgeColor: "#f59e42",
        description: `http_req_waiting: ${Math.round(
          m["http_req_waiting"].avg
        )}ms`,
      }),
    },
    {
      condition: (m) =>
        m["http_req_failed"] &&
        typeof m["http_req_failed"].value === "number" &&
        m["http_req_failed"].value * 100 > 1,
      build: (m) => {
        const errorRate = m["http_req_failed"].value * 100;
        return {
          label: "High Error Rate",
          value: `${errorRate.toFixed(2)}%`,
          key: "http_req_failed",
          icon: '<i class="fas fa-exclamation-triangle text-yellow-500"></i>',
          badge: "Critical",
          badgeColor: "#ef4444",
          description: `Error Rate: ${errorRate.toFixed(2)}%`,
        };
      },
    },
  ];
  return rules.filter((r) => r.condition(metrics)).map((r) => r.build(metrics));
}

function parseEndpoints(metrics) {
  if (!metrics["http_req_duration"]) return [];
  return [
    {
      path: "GET https://test.k6.io",
      avg: Math.round(metrics["http_req_duration"].avg || 0),
      p95: Math.round(metrics["http_req_duration"]["p(95)"] || 0),
      p99: Math.round(metrics["http_req_duration"]["p(99)"] || 0),
      rps: metrics["http_reqs"]?.rate
        ? metrics["http_reqs"].rate.toFixed(2)
        : "N/A",
      errorRate: metrics["http_req_failed"]?.value
        ? metrics["http_req_failed"].value * 100
        : 0,
      successRate: metrics["http_req_failed"]?.value
        ? 100 - metrics["http_req_failed"].value * 100
        : 100,
      statusCodes: {
        "2xx": metrics["http_reqs"]?.count || 0,
        "4xx": 0,
        "5xx": 0,
      },
    },
  ];
}

function parsePercentileChart(metrics) {
  const d = metrics["http_req_duration"];
  if (!d) return null;
  return {
    type: "bar",
    data: {
      labels: ["p90", "p95"],
      datasets: [
        {
          label: "Percentile (ms)",
          data: [d["p(90)"], d["p(95)"]],
          backgroundColor: ["#6366f1", "#f59e42"],
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
        y: { beginAtZero: true, title: { display: true, text: "ms" } },
        x: { title: { display: true, text: "Percentile" } },
      },
    },
  };
}

function parseStatusCodeChart(metrics) {
  const reqs = metrics["http_reqs"];
  return reqs
    ? {
        type: "doughnut",
        data: {
          labels: ["2xx", "4xx", "5xx"],
          datasets: [
            {
              label: "Status Codes",
              data: [reqs.count || 0, 0, 0],
              backgroundColor: ["#22c55e", "#f59e42", "#dc2626"],
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
      }
    : null;
}

export function parseK6Json(json) {
  let breakdownData = [];
  let performanceChart = null;
  let criticalMetrics = [];
  let endpoints = [];
  let percentileChart = null;
  let statusCodeChart = null;
  let avgDuration = 0;

  if (json.metrics) {
    const metrics = json.metrics;
    const durationKeys = [
      { key: "http_req_blocked", label: "Blocked", color: "barBlue" },
      { key: "http_req_connecting", label: "Connecting", color: "barIndigo" },
      {
        key: "http_req_tls_handshaking",
        label: "TLS Handshaking",
        color: "barPurple",
      },
      { key: "http_req_sending", label: "Sending", color: "barPink" },
      { key: "http_req_waiting", label: "Waiting", color: "barRed" },
      { key: "http_req_receiving", label: "Receiving", color: "barBlue" },
    ];
    let total = 0;
    const values = durationKeys.map(({ key }) => {
      const v = metrics[key]?.avg || 0;
      total += v;
      return v;
    });
    breakdownData = durationKeys
      .map((item, idx) => ({
        label: item.label,
        value: Math.round(values[idx]),
        percent: total ? Math.round((values[idx] / total) * 100) : 0,
        color: item.color,
      }))
      .filter((b) => b.value > 0);

    criticalMetrics = parseCriticalMetrics(metrics);
    endpoints = parseEndpoints(metrics);
    percentileChart = parsePercentileChart(metrics);
    statusCodeChart = parseStatusCodeChart(metrics);
  }
  avgDuration =
    breakdownData.length > 0
      ? breakdownData.reduce((acc, cur) => acc + cur.value, 0)
      : json.metrics && json.metrics["http_req_duration"]?.avg
      ? Math.round(json.metrics["http_req_duration"].avg)
      : 0;
  return {
    ...json,
    breakdownData,
    performanceChart,
    criticalMetrics,
    endpoints,
    percentileChart,
    statusCodeChart,
    avgDuration,
  };
}
