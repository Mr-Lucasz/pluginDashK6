import React from "react";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import styles from "./SummaryCards.module.css";

// Funções de transformação para cada KPI
export function transformHttpRequests(metrics) {
	if (!metrics || !metrics.http_reqs) return null;
	return {
		title: 'HTTP Requests',
		value: metrics.http_reqs?.count?.toLocaleString('pt-BR') || 0,
		trend: 12.5, 
		trendDirection: 'up',
		trendColor: 'textGreen',
		trendLabel: 'vs last week',
		cardClass: `${styles.bgBlue100} ${styles.roundedFull}`,
		icon: <i className="fas fa-exchange-alt text-xl"></i>,
	};
}
export function transformAvgResponseTime(metrics) {
	if (!metrics || !metrics.http_req_duration) return null;
	return {
		title: 'Avg. Response Time',
		value: Math.round(metrics.http_req_duration.avg).toLocaleString('pt-BR'),
		valueSuffix: 'ms',
		trend: 28.7, // Exemplo fixo
		trendDirection: 'up',
		trendColor: 'textRed',
		trendLabel: 'vs last week',
		cardClass: `${styles.bgRed100} ${styles.roundedFull} ${styles.criticalFlag}`,
		icon: <i className="fas fa-clock text-xl"></i>,
	};
}
export function transformErrorRate(metrics) {
	if (!metrics || !metrics.http_req_failed) return null;
	// Exemplo: taxa de erro = (fails / (passes + fails)) * 100
	const fails = metrics.http_req_failed.fails || 0;
	const passes = metrics.http_req_failed.passes || 0;
	const errorRate = passes + fails > 0 ? (fails / (passes + fails)) * 100 : 0;
	return {
		title: 'Error Rate',
		value: errorRate.toFixed(1),
		valueSuffix: '%',
		trend: -1.4, // Exemplo fixo
		trendDirection: 'down',
		trendColor: 'textGreen',
		trendLabel: 'vs last week',
		cardClass: `${styles.bgYellow100} ${styles.roundedFull}`,
		icon: <i className="fas fa-exclamation-triangle text-xl"></i>,
	};
}
export function transformVirtualUsers(metrics) {
	if (!metrics || !metrics.vus) return null;
	return {
		title: 'Virtual Users',
		value: metrics.vus.value?.toLocaleString('pt-BR') || 0,
		trend: 50, // Exemplo fixo
		trendDirection: 'up',
		trendColor: 'textGreen',
		trendLabel: 'vs last test',
		cardClass: `${styles.bgPurple100} ${styles.roundedFull}`,
		icon: <i className="fas fa-users text-xl"></i>,
	};
}

const SummaryCards = ({ isLoading, isError, k6Data }) => {
	const metrics = k6Data?.metrics;
	const cardsToRender = [
		transformHttpRequests(metrics),
		transformAvgResponseTime(metrics),
		transformErrorRate(metrics),
		transformVirtualUsers(metrics),
	];

	return (
		<>
			{cardsToRender.map((card, idx) => (
				<div key={card?.title || idx} className={`${styles.card} ${card?.cardClass || ''} metric-card`}>
					<div className={styles.flexBetween} style={{ width: '100%' }}>
						<div style={{ textAlign: 'left' }}>
							<p className={`${styles.textGray} ${styles.fontMedium}`}>{card?.title || [
                'HTTP Requests',
                'Avg. Response Time',
                'Error Rate',
                'Virtual Users',
              ][idx]}</p>
							{card ? (
								<>
									<h3 className={`${styles.text3xl} ${styles.fontBold} ${card.valueSuffix ? '' : ''} mt-2`}>
										{card.value}{card.valueSuffix && <span className="text-xl">{card.valueSuffix}</span>}
									</h3>
									<div className="flex items-center mt-2">
										{card.trend !== null && card.trend !== undefined && card.trendDirection && (
											<>
												<i className={`fas fa-arrow-${card.trendDirection === 'up' ? 'up' : 'down'} ${styles[card.trendColor]} mr-1`}></i>
												<span className={`${styles[card.trendColor]} ${styles.fontMedium}`}>{Math.abs(card.trend)}{card.valueSuffix === '%' ? '%' : ''}</span>
												<span className={`${styles.textGray} ${styles.textSm} ml-2`}>{card.trendLabel}</span>
											</>
										)}
									</div>
								</>
							) : null}
						</div>
						<div className={card?.cardClass} style={{ padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							{card?.icon}
						</div>
					</div>
					<div className={`${styles.mt4} ${styles.pt4} ${styles.borderTop}`}>
            <div className={styles.h16} style={{display: !card ? 'flex' : undefined, alignItems: !card ? 'center' : undefined, justifyContent: !card ? 'center' : undefined, height: '100%'}}>
              {card ? null : <EmptyState message="Nenhum dado para o KPI." />}
            </div>
          </div>
				</div>
			))}
		</>
	);
};

export default SummaryCards;
