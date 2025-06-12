import React from "react";
import emptyImg from "../assets/empty-folder.png";

const EmptyState = ({ message = "Nenhum dado disponível." }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    height: '100%', minHeight: 180, color: '#64748b', background: '#f9fafb', borderRadius: 12, padding: 24, textAlign: 'center', border: '1px dashed #e5e7eb',
    position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto', zIndex: 2
  }}>
    <img src={emptyImg} alt="Nenhum dado" style={{ width: 72, height: 72, marginBottom: 16, opacity: 0.7 }} />
    <span style={{ fontSize: 16 }}>{message}</span>
  </div>
);

export default EmptyState;
