import React from "react";
import errorImg from "../assets/close.png";

const ErrorState = ({ message = "Erro ao carregar dados." }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    height: '100%', minHeight: 180, color: '#dc2626', background: '#fef2f2', borderRadius: 12, padding: 24, textAlign: 'center', border: '1px dashed #fecaca',
    position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto', zIndex: 2
  }}>
    <img src={errorImg} alt="Erro" style={{ width: 72, height: 72, marginBottom: 16, opacity: 0.7 }} />
    <span style={{ fontSize: 16 }}>{message}</span>
  </div>
);

export default ErrorState;
