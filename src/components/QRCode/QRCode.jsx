import { useContext, useRef } from 'react';
import { QRCodeContext } from '../../contexts/QRCodeContext';

export default function QRCode() {
  const { isQRImgActive, qrImageSrc } = useContext(QRCodeContext);

  const qrImgRef = useRef(null);

  return (
    <>
      {isQRImgActive && (
        <div className="qr-code">
          <img ref={qrImgRef} src={qrImageSrc} alt="qr-code" />
        </div>
      )}
    </>
  );
}
