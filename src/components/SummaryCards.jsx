import React from "react";
import { FaArrowUp, FaArrowDown, FaExchangeAlt, FaClock, FaExclamationTriangle, FaUsers } from "react-icons/fa";
import SmallChart from "./SmallChart";
import styles from "./SummaryCards.module.css";

const summaryCards = [
	{
		title: "HTTP Requests",
		value: "246,789",
		icon: <FaExchangeAlt className={styles.textBlue} />,
		iconBg: styles.bgBlue100,
		trendIcon: <FaArrowUp className={styles.textGreen} />,
		trend: "12.5%",
		trendColor: styles.textGreen,
		sub: "vs last week",
		chartColor: "#3B82F6",
		chartData: [100, 110, 120, 90, 80, 100, 120, 110, 100, 90, 110, 120],
		cardClass: ""
	},
	{
		title: "Avg. Response Time",
		value: <><span>1,240</span><span className={styles.text3xl}>ms</span></>,
		icon: <FaClock className={styles.textRed} />,
		iconBg: styles.bgRed100,
		trendIcon: <FaArrowUp className={styles.textRed} />,
		trend: "28.7%",
		trendColor: styles.textRed,
		sub: "vs last week",
		chartColor: "#EF4444",
		chartData: [120, 130, 110, 100, 90, 80, 70, 100, 110, 120, 130, 120],
		cardClass: styles.criticalFlag
	},
	{
		title: "Error Rate",
		value: <><span>3.2</span><span className={styles.text3xl}>%</span></>,
		icon: <FaExclamationTriangle className={styles.textYellow} />,
		iconBg: styles.bgYellow100,
		trendIcon: <FaArrowDown className={styles.textGreen} />,
		trend: "1.4%",
		trendColor: styles.textGreen,
		sub: "vs last week",
		chartColor: "#F59E0B",
		chartData: [50, 60, 70, 40, 30, 50, 60, 70, 60, 50, 40, 30],
		cardClass: ""
	},
	{
		title: "Virtual Users",
		value: "250",
		icon: <FaUsers className={styles.textPurple} />,
		iconBg: styles.bgPurple100,
		trendIcon: <FaArrowUp className={styles.textGreen} />,
		trend: "50%",
		trendColor: styles.textGreen,
		sub: "vs last test",
		chartColor: "#8B5CF6",
		chartData: [80, 90, 100, 70, 60, 80, 100, 90, 80, 70, 90, 100],
		cardClass: ""
	}
];

const SummaryCards = () => (
	<>
		{summaryCards.map((card, idx) => (
			<div
				key={card.title}
				className={`${styles.card} ${card.cardClass}`}
			>
				<div className={styles.flexBetween}>
					<div>
						<p className={styles.textGray}>{card.title}</p>
						<h3 className={styles.text3xl}>{card.value}</h3>
						<div className={styles.flexItems} style={{ marginTop: 8 }}>
							{card.trendIcon}
							<span className={`${styles.trend} ${card.trendColor}`} style={{ marginLeft: 4 }}>{card.trend}</span>
							<span className={styles.textGray} style={{ fontSize: 14, marginLeft: 8 }}>{card.sub}</span>
						</div>
					</div>
					<div className={`${styles.iconBox} ${card.iconBg}`}>{card.icon}</div>
				</div>
				<div className={`${styles.mt4} ${styles.pt4} ${styles.borderTop} ${styles.h16}`}>
					<SmallChart color={card.chartColor} data={card.chartData} />
				</div>
			</div>
		))}
	</>
);

export default SummaryCards;
