import React from "react";
import emptyImg from "../assets/empty-folder.png";
import styles from './EmptyState.module.css';

const EmptyState = ({ message = "Nenhum dado disponível." }) => (
  <div className={styles.emptyContainer}>
    <img src={emptyImg} alt="Nenhum dado" className={styles.emptyImg} />
    <span className={styles.emptyText}>{message}</span>
  </div>
);

export default EmptyState;
