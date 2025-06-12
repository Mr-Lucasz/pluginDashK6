// src/hooks/useK6Upload.js
import { useState } from "react";
import { parseK6Json } from "./k6JsonParser";

export default function useK6Upload() {
  const [uploadedData, setUploadedData] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorDetail, setErrorDetail] = useState("");

  const handleFileUpload = (e) => {
    setUploadError("");
    setUploadSuccess(false);
    setShowModal(false);
    setErrorDetail("");
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.endsWith('.json')) {
      setUploadError("Por favor, envie um arquivo .json gerado pelo k6.");
      setShowModal(true);
      setErrorDetail("Extensão de arquivo inválida.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const parsed = parseK6Json(json);
        setUploadedData(parsed);
        setUploadSuccess(true);
      } catch (err) {
        setUploadError("Arquivo inválido ou corrompido.");
        setShowModal(true);
        setErrorDetail(err.message);
        console.error("Erro ao fazer upload do JSON:", err);
      }
    };
    reader.readAsText(file);
  };

  return {
    uploadedData,
    uploadError,
    uploadSuccess,
    showModal,
    errorDetail,
    setShowModal,
    setUploadSuccess,
    handleFileUpload,
  };
}
