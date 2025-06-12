import React from "react";
import styles from "./ApiEndpointBreakdown.module.css";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const ApiEndpointBreakdown = ({ endpoints, isLoading, isError }) => {
	if (isLoading) return <LoadingState message="Carregando endpoints..." />;
	if (isError) return <ErrorState message="Erro ao carregar endpoints." />;
	return (
		<div className={styles.root}>
			<h3 className={styles.title}>Desempenho por Endpoint</h3>
			{(!endpoints || endpoints.length === 0) ? (
				<EmptyState message="Nenhum endpoint encontrado." />
			) : (
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
								<td style={{ color: ep.errorRate > 1 ? "#dc2626" : "#64748b" }}>{ep.errorRate.toFixed(2)}</td>
								<td style={{ color: ep.successRate < 99 ? "#dc2626" : "#22c55e" }}>{ep.successRate.toFixed(2)}</td>
								<td>
									<span style={{ color: "#22c55e" }}>{ep.statusCodes["2xx"]}x2xx</span>{" "}
									<span style={{ color: "#f59e42" }}>{ep.statusCodes["4xx"]}x4xx</span>{" "}
									<span style={{ color: "#dc2626" }}>{ep.statusCodes["5xx"]}x5xx</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default ApiEndpointBreakdown;
