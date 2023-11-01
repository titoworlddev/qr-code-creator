import Header from './components/Header/Header';
import Form from './components/Form/Form';
import QRCode from './components/QRCode/QRCode';
import QRCodeProvider from './contexts/QRCodeProvider';
import { useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

function App() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    wrapperRef.current && autoAnimate(wrapperRef.current);
  }, [wrapperRef]);

  return (
    <QRCodeProvider>
      <div className="wrapper" ref={wrapperRef}>
        <Header />

        <Form />

        <QRCode />
      </div>
    </QRCodeProvider>
  );
}

export default App;
