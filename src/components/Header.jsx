import React from "react";
import { FaTachometerAlt, FaSyncAlt, FaChevronDown } from "react-icons/fa";
import styles from "./Header.module.css";

const Header = ({ selectedFilter, onFilterChange, onRefresh, isRefreshing }) => (
  <header className={`${styles.gradientBg} ${styles.header}`}>
    <div className={styles.container}>
      <div className={styles.flexRow}>
        <div className={`${styles.itemsCenter} ${styles.mb4}`}>
          <FaTachometerAlt className={styles.mr3} style={{ fontSize: '1.875rem' }} />
          <h1 className={styles.title}>K6 Performance Dashboard</h1>
        </div>
        <div className={styles.itemsCenter} style={{ gap: '1rem' }}>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={selectedFilter}
              onChange={e => onFilterChange(e.target.value)}
              aria-label="Select time range"
            >
              <option value="Last 1 hour" style={{ color: '#1f2937' }}>Last 1 hour</option>
              <option value="Last 24 hours" style={{ color: '#1f2937' }}>Last 24 hours</option>
              <option value="Last 7 days" style={{ color: '#1f2937' }}>Last 7 days</option>
              <option value="Custom range" style={{ color: '#1f2937' }}>Custom range</option>
            </select>
            <FaChevronDown className={styles.chevron} />
          </div>
          <button className={styles.refreshBtn} onClick={onRefresh} disabled={isRefreshing} aria-label="Refresh dashboard">
            <FaSyncAlt className={styles.refreshIcon} style={isRefreshing ? { animation: 'spin 1s linear infinite' } : {}} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>
    </div>
  </header>
);

export default Header;

// Adiciona animação de spin para o ícone de refresh
// (coloque no CSS global ou Header.module.css):
// @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
