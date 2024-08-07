import React, { useState } from 'react';

const CreditCardPayment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  const handlePayment = () => {
    // Implementar a lógica de pagamento com cartão de crédito
    alert('Pagamento realizado com sucesso!');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">Pagamento com Cartão de Crédito</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Número do Cartão</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 mr-2">
          <label className="block text-gray-700">Validade</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="w-1/2 ml-2">
          <label className="block text-gray-700">CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Nome do Titular</label>
        <input
          type="text"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition"
      >
        Realizar Pagamento
      </button>
    </div>
  );
};

export default CreditCardPayment;
