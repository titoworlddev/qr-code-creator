import { useContext, useEffect, useRef } from 'react';
import { QRCodeContext } from '../../contexts/QRCode/QRCodeContext';

import './Form.css';
import useAppLanguage from '../../hooks/useAppLanguage';
import { languages } from '../../languages/languages';
import { IconEraser } from '@tabler/icons-react';

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
  const { appLanguage } = useAppLanguage();
  const { defaultText, generatingText } =
    languages[appLanguage].form.submitButton;

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
        }, 300);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleInputOnChange = e => {
    const qrCode = document.querySelector('.qr-code');

    // Added this display = 'none' because the hiding animation is very gross if you don't make this
    if (qrCode) qrCode.style.display = 'none';
    setIsQRImgActive(false);
    setQrInputValue(e.target.value);
  };

  const handleResetInputValue = () => {
    const qrCode = document.querySelector('.qr-code');

    if (qrCode) qrCode.style.display = 'none';
    setIsQRImgActive(false);
    setQrInputValue('');
  };

  useEffect(() => {
    const inputContainer = document.querySelector('.input');
    const input = document.querySelector('.input input');
    const addFocus = () => {
      inputContainer.classList.add('focus');
    };
    const removeFocus = () => {
      inputContainer.classList.remove('focus');
    };

    input.addEventListener('focus', addFocus);
    input.addEventListener('blur', removeFocus);

    return () => {
      input.removeEventListener('focus', addFocus);
      input.removeEventListener('blur', removeFocus);
    };
  }, []);

  return (
    <form onSubmit={handleGenerateCode} className="form">
      <div className="input">
        <input
          type="text"
          spellCheck={false}
          placeholder="https://..."
          value={qrInputValue}
          onChange={handleInputOnChange}
        />
        {qrInputValue && (
          <div className="button" onClick={handleResetInputValue}>
            <IconEraser color="#1d455f" />
          </div>
        )}
      </div>

      <button>{isGeneratingQR ? generatingText : defaultText}</button>
    </form>
  );
}
