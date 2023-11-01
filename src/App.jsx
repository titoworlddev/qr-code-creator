import Header from './components/Header/Header';
import Form from './components/Form/Form';
import QRCode from './components/QRCode/QRCode';
import QRCodeProvider from './contexts/QRCodeProvider';

function App() {
  return (
    <QRCodeProvider>
      <div className="wrapper">
        <Header />

        <Form />

        <QRCode />
      </div>
    </QRCodeProvider>
  );
}

export default App;
