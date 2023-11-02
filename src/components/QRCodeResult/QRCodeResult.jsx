import { useContext, useRef } from 'react';
import { QRCodeContext } from '../../contexts/QRCode/QRCodeContext';

import './QRCodeResult.css';

export default function QRCodeResult() {
  const { isQRImgActive, qrImageSrc } = useContext(QRCodeContext);

  const qrImgRef = useRef(null);

  return (
    <>
      {isQRImgActive && (
        <div className="qr-code-result">
          <img ref={qrImgRef} src={qrImageSrc} alt="qr-code-result" />
        </div>
      )}
      <div className="qr-error-img" style={{ display: 'none' }}></div>
    </>
  );
}
