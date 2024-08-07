import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const PixPayment = () => {
  const [timer, setTimer] = useState(300); // 5 minutos em segundos
  const [isPaid, setIsPaid] = useState(false);
  const pixCode = "00020126420014br.gov.bcb.pix0136b9d9f81b982443c94da76177cb1eb50278";
  const [qrCodeData, setQrCodeData] = useState('');

  useEffect(() => {
    const generateQRCode = async () => {
      const qrDataUrl = await new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const qr = new QRious({
          element: canvas,
          value: pixCode,
          size: 256,
        });
        resolve(canvas.toDataURL('image/png'));
      });
      setQrCodeData(qrDataUrl);
    };

    generateQRCode();

    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    alert('Código Pix copiado para a área de transferência!');
  };

  const handlePayment = () => {
    setIsPaid(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      {!isPaid ? (
        <>
          <h1 className="text-3xl font-bold text-purple-700 mb-4">Pagamento com Pix</h1>
          {qrCodeData && <img src={qrCodeData} alt="QR Code" className="mb-4" />}
          <p className="text-gray-700 mb-4">Escaneie o QR Code ou copie o código Pix abaixo:</p>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={pixCode}
              readOnly
              className="p-2 border rounded-l w-full"
            />
            <button
              onClick={handleCopy}
              className="bg-purple-600 text-white font-bold py-2 px-4 rounded-r hover:bg-purple-700 transition"
            >
              Copiar
            </button>
          </div>
          <p className="text-gray-700 mb-4">Tempo restante: {formatTime(timer)}</p>
          <button
            onClick={handlePayment}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Simular Pagamento
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-6xl mb-4 animate-bounce" />
          <h1 className="text-3xl font-bold text-green-500">Pagamento Confirmado!</h1>
        </div>
      )}
    </div>
  );
};

export default PixPayment;
