import { useRef, useState } from 'react';
import Header from './components/Header/Header';

function App() {
  const qrImgRef = useRef(null);
  const prevValueRef = useRef(null);

  const [qrInputValue, setQrInputValue] = useState('');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [isQRImgActive, setIsQRImgActive] = useState(false);
  const [qrImageSrc, setQrImageSrc] = useState('');

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
    <div className="wrapper">
      <Header />

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
