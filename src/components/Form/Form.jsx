import { useContext, useRef } from 'react';
import { QRCodeContext } from '../../contexts/QRCodeContext';

export default function Form() {
  const {
    qrInputValue,
    setQrInputValue,
    isGeneratingQR,
    setIsGeneratingQR,
    setIsQRImgActive,
    setQrImageSrc
  } = useContext(QRCodeContext);
  const prevValueRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleGenerateCode = e => {
    e.preventDefault();

    const qrValue = qrInputValue.trim();
    if (!qrValue || prevValueRef.current === qrValue) return;

    prevValueRef.current = qrValue;
    setIsGeneratingQR(true);

    fetch(`${apiUrl}${qrValue}`)
      .then(data => {
        setQrImageSrc(data.url);
        setTimeout(() => {
          setIsQRImgActive(true);
          setIsGeneratingQR(false);
        }, 200);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleInputOnChange = e => {
    setIsQRImgActive(false);
    setQrInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleGenerateCode} className="form">
      <input
        type="text"
        spellCheck={false}
        placeholder="Ingresa aqui la URL..."
        value={qrInputValue}
        onChange={handleInputOnChange}
      />

      <button>
        {isGeneratingQR ? 'Generando código...' : 'Generar código'}
      </button>
    </form>
  );
}
