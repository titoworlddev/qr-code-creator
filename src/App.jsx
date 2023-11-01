import Header from './components/Header/Header';
import Form from './components/Form/Form';
import QRCode from './components/QRCode/QRCode';
import QRCodeProvider from './contexts/QRCode/QRCodeProvider';
import { useEffect, useLayoutEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';
import useAppLanguage from './hooks/useAppLanguage';

function App() {
  const { setDocumentLang } = useAppLanguage();
  const wrapperRef = useRef(null);

  useEffect(() => {
    wrapperRef.current && autoAnimate(wrapperRef.current);
  }, [wrapperRef]);

  useLayoutEffect(() => {
    setDocumentLang();
  }, [setDocumentLang]);

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
