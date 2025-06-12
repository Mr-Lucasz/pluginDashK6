import React from "react";
import { FaTachometerAlt, FaSyncAlt } from "react-icons/fa";
import styles from "./Header.module.css";

const Header = ({ onRefresh, isRefreshing, onFileUpload, uploadError, uploadSuccess }) => (
  <header className={`${styles.gradientBg} ${styles.header}`}>
    <div className={styles.container}>
      <div className={styles.flexRow}>
        <div className={`${styles.itemsCenter} ${styles.mb4}`}>
          <FaTachometerAlt className={styles.mr3} style={{ fontSize: '1.875rem' }} />
          <h1 className={styles.title}>K6 Performance Dashboard</h1>
        </div>
        <div className={styles.itemsCenter} style={{ gap: '1rem' }}>
          <label htmlFor="upload-json" style={{
            background: 'linear-gradient(90deg, #2563eb 0%, #0ea5e9 100%)',
            color: '#fff',
            padding: '0.5rem 1.5rem',
            borderRadius: 10,
            fontWeight: 500,
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(59,130,246,0.10)',
            marginRight: 8,
            transition: 'background 0.2s'
          }}>
            <span role="img" aria-label="Upload" style={{ marginRight: 6 }}>📤</span>
            Upload JSON
            <input
              id="upload-json"
              type="file"
              accept=".json,application/json"
              onChange={onFileUpload}
              style={{ display: 'none' }}
            />
          </label>
          {uploadError && <span style={{ color: '#ef4444', fontSize: 13 }}>{uploadError}</span>}
          {uploadSuccess && <span style={{ color: '#22c55e', fontSize: 13 }}>Arquivo carregado!</span>}
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
