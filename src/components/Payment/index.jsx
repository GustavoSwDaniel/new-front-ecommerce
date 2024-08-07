import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const navigate = useNavigate();

  const handlePaymentSelection = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleFinalizePurchase = () => {
    if (selectedPaymentMethod) {
      navigate(`/${selectedPaymentMethod}`);
    } else {
      alert("Por favor, selecione um método de pagamento.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">Pagamento</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Carrinho</span>
            <span className="text-gray-500 mr-2">→</span>
            <span className="text-gray-500 mr-2">Identificação</span>
            <span className="text-gray-500 mr-2">→</span>
            <span className="text-gray-900 font-bold">Pagamento</span>
            <span className="text-gray-500 mx-2">→</span>
            <span className="text-gray-500">Finalização</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Método de pagamento</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4 cursor-pointer" onClick={() => handlePaymentSelection('pix')}>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-bold">Pix</span>
                <input type="checkbox" checked={selectedPaymentMethod === 'pix'} readOnly />
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4 cursor-pointer" onClick={() => handlePaymentSelection('creditCard')}>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-bold">Cartão de crédito</span>
                <input type="checkbox" checked={selectedPaymentMethod === 'creditCard'} readOnly />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Resumo</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-gray-700">R$ 5.000,00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Frete</span>
                <span className="text-gray-700">R$ 34,06</span>
              </div>
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>R$ 5.034,06</span>
              </div>
            </div>
            <button
              onClick={handleFinalizePurchase}
              className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition mt-4"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
