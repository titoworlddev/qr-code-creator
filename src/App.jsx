import { useRef, useState } from 'react';

function App() {
  const qrImgRef = useRef(null);
  const prevValueRef = useRef(null);

  const [qrInputValue, setQrInputValue] = useState('');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [isQRImgActive, setIsQRImgActive] = useState(false);
  const [qrImageSrc, setQrImageSrc] = useState('');

  const handleGenerateCode = e => {
    e.preventDefault();

    const qrValue = qrInputValue.trim();
    if (!qrValue || prevValueRef.current === qrValue) return;

    prevValueRef.current = qrValue;
    setIsGeneratingQR(true);
    setQrImageSrc(
      `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`
    );

    setTimeout(() => {
      setIsQRImgActive(true);
      setIsGeneratingQR(false);
    }, 200);
  };

  const handleInputOnChange = e => {
    setIsQRImgActive(false);
    setQrInputValue(e.target.value);
  };

  return (
    <div className="wrapper">
      <header>
        <h1>Crea tu código QR</h1>
        <p>Ingresa una URL para generar un código QR</p>
      </header>

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

      {isQRImgActive && (
        <div className="qr-code">
          <img ref={qrImgRef} src={qrImageSrc} alt="qr-code" />
        </div>
      )}
    </div>
  );
}

export default App;
