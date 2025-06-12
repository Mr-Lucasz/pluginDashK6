import React from "react";
import styles from "./Modal.module.css";

const UploadErrorModal = ({ show, error, detail, onClose }) => {
  if (!show) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h2 className={styles.modalTitleError}>Erro ao carregar arquivo</h2>
        <p>{error}</p>
        <pre className={styles.modalTextError}>{detail}</pre>
        <button className={styles.modalButtonError} onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default UploadErrorModal;
