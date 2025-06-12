import React from "react";
import loadingImg from "../../assets/loading.png";
import styles from './LoadingState.module.css';

const LoadingState = ({ message = "Carregando dados..." }) => (
  <div className={styles.loadingState}>
    <img src={loadingImg} alt="Carregando" className={styles.loadingImage} />
    <span className={styles.loadingMessage}>{message}</span>
  </div>
);

export default LoadingState;
