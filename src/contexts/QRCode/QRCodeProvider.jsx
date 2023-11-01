import { useState } from 'react';
import { QRCodeContext } from './QRCodeContext';
import { PropTypes } from 'prop-types';

export default function QRCodeProvider({ children }) {
  const [qrInputValue, setQrInputValue] = useState('');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [isQRImgActive, setIsQRImgActive] = useState(false);
  const [qrImageSrc, setQrImageSrc] = useState('');

  return (
    <QRCodeContext.Provider
      value={{
        qrInputValue,
        setQrInputValue,
        isGeneratingQR,
        setIsGeneratingQR,
        isQRImgActive,
        setIsQRImgActive,
        qrImageSrc,
        setQrImageSrc
      }}
    >
      {children}
    </QRCodeContext.Provider>
  );
}

QRCodeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
