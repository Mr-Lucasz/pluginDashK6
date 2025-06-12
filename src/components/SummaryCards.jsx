import React from "react";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import styles from "./SummaryCards.module.css";

const indicatorTitles = [
	'HTTP Requests',
	'Avg. Response Time',
	'Error Rate',
	'Virtual Users'
];

const indicatorIcons = [
	<i className="fas fa-exchange-alt text-xl" style={{ color: '#2563eb' }}></i>,
	<i className="fas fa-clock text-xl" style={{ color: '#dc2626' }}></i>,
	<i className="fas fa-exclamation-triangle text-xl" style={{ color: '#f59e42' }}></i>,
	<i className="fas fa-users text-xl" style={{ color: '#a21caf' }}></i>
];

const SummaryCards = ({ isLoading, isError, data }) => {
	// Sempre renderiza 4 cards, mesmo se não houver dados
	const cardsToRender = data && data.length > 0 ? data : Array(4).fill(null);

	return (
		<>
			{cardsToRender.map((card, idx) => (
				<div key={card?.title || idx} className={`${styles.card} ${card?.cardClass || ''}`}>
					<div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
						<span className={styles.iconBox}>{indicatorIcons[idx]}</span>
						<h3 className={styles.title} style={{ margin: 0 }}>{card?.title || indicatorTitles[idx]}</h3>
					</div>
					{isLoading && <LoadingState message="Carregando KPIs..." />}
					{isError && <ErrorState message="Erro ao carregar KPIs." />}
					{!card && !isLoading && !isError && <EmptyState message="Nenhum dado para os KPIs." />}
					{/* Renderize o conteúdo do card se houver dados */}
					{card && !isLoading && !isError && (
						<>
							<div className={styles.value}>{card.value}</div>
							{card.trend && (
								<div className={styles.trend} style={{ color: card.trend > 0 ? '#22c55e' : '#dc2626' }}>
									{card.trend > 0 ? '+' : ''}{card.trend}%
								</div>
							)}
							{card.description && (
								<div className={styles.label}>{card.description}</div>
							)}
						</>
					)}
				</div>
			))}
		</>
	);
};

export default SummaryCards;
