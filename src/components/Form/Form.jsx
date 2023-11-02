import './Form.css';

import { useContext, useEffect, useRef } from 'react';
import { QRCodeContext } from '../../contexts/QRCode/QRCodeContext';

import useAppLanguage from '../../hooks/useAppLanguage';
import { languages } from '../../languages/languages';
import { IconEraser } from '@tabler/icons-react';
import { QRCode } from '../../utils/qrcode.min';

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
        // As I am interested in demonstrating that I manage the use of APIs, the main method to generate the QR is through the API, but if it fails, a code is still generated using the 'qrcodejs' library from https://github.com/davidshimjs/qrcodejs
        const qrErrorImg = document.querySelector('.qr-error-img');
        new QRCode(qrErrorImg, {
          text: 'csdcsd',
          width: 200,
          height: 200,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        });
        setTimeout(() => {
          setQrImageSrc(qrErrorImg.lastChild.src);
          setIsQRImgActive(true);
          setIsGeneratingQR(false);
          qrErrorImg.firstChild.remove();
          qrErrorImg.lastChild.remove();
        }, 300);
        console.log(error);
      });
  };

  const handleInputOnChange = e => {
    const qrCodeResult = document.querySelector('.qr-code-result');

    // Added this display = 'none' because the hiding animation is very gross if you don't make this
    if (qrCodeResult) qrCodeResult.style.display = 'none';
    setIsQRImgActive(false);
    setQrInputValue(e.target.value);
  };

  const handleResetInputValue = () => {
    const qrCodeResult = document.querySelector('.qr-code-result');

    if (qrCodeResult) qrCodeResult.style.display = 'none';
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
