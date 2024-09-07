import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';

const PixPayment = () => {
  const [timer, setTimer] = useState(300); // 5 minutos em segundos
  const [isPaid, setIsPaid] = useState(false);
  const { orderDetails } = useSelector((state) => state.order);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(`http://localhost:8081/orders/${orderDetails.uuid}`);
        if (response.data.status === 'approved') {
          setIsPaid(true);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error('Error fetching payment status:', error);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [orderDetails.uuid]);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderDetails.payment_info.code);
    alert('Código Pix copiado para a área de transferência!');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    if (timer > 0 && !isPaid) {
      const countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer, isPaid]);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex justify-center items-center flex-grow">
        {!isPaid ? (
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-purple-700 mb-4">Pagamento com Pix</h1>
            {orderDetails.payment_info.encodedImage && (
              <img src={orderDetails.payment_info.encodedImage} alt="QR Code" className="mb-4" />
            )}
            <p className="text-gray-700 mb-4">Escaneie o QR Code ou copie o código Pix abaixo:</p>
            <div className="flex items-center mb-4 w-full max-w-md">
              <input
                type="text"
                value={orderDetails.payment_info.code}
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
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-8xl mb-4 animate-bounce" />
            <h1 className="text-4xl font-bold text-green-500">Pagamento Confirmado!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default PixPayment;
