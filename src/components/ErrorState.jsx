import React from "react";
import errorImg from "../assets/close.png";
import styles from './ErrorState.module.css';

const ErrorState = ({ message = "Erro ao carregar dados." }) => (
  <div className={styles.errorState} id="error-state">
    <img src={errorImg} alt="Erro" className={styles.errorImage} id="error-image"/>
    <span className={styles.errorMessage}>{message}</span>
  </div>
);

export default ErrorState;
