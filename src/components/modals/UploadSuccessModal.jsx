import React from "react";
import styles from "./Modal.module.css";

const UploadSuccessModal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h2 className={styles.modalTitleSuccess}>Upload realizado com sucesso!</h2>
        <p className={styles.modalTextSuccess}>O arquivo foi carregado e processado corretamente.</p>
        <button className={styles.modalButtonSuccess} onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default UploadSuccessModal;
