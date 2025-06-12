import React from "react";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import styles from "./SummaryCards.module.css";

const SummaryCards = ({ isLoading, isError, data }) => {
	if (isLoading) return <LoadingState message="Carregando KPIs..." />;
	if (isError) return <ErrorState message="Erro ao carregar KPIs." />;

	// Sempre renderiza 4 cards, mesmo se não houver dados
	const cardsToRender = data && data.length > 0 ? data : Array(4).fill(null);

	return (
		<>
			{cardsToRender.map((card, idx) => (
				<div key={card?.title || idx} className={`${styles.card} ${card?.cardClass || ''}`}>
					{!card && <EmptyState message="Nenhum dado para os KPIs." />}
				</div>
			))}
		</>
	);
};

export default SummaryCards;
