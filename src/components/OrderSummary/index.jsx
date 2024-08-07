import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ order }) => {
  const navigate = useNavigate();

  const handleBackToOrders = () => {
    navigate('/orders');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Pedido: {order.id} - {order.date}</h2>
      <p className="text-green-600 font-bold">{order.status}</p>
      <p className="text-gray-700 mb-4">{order.paymentMethod}</p>
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex mb-4">
            <img src={item.img} alt={item.name} className="w-16 h-16 object-contain mr-4" />
            <div>
              <h3 className="text-gray-700 font-bold">{item.name}</h3>
              <p className="text-gray-500">Quantidade: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
        <h3 className="text-lg font-bold text-gray-700">Endereço de entrega</h3>
        <p className="text-gray-700">{order.address}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Total produto(s)</span>
          <span className="text-gray-700">R$ {order.totalProducts.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Frete</span>
          <span className="text-gray-700">R$ {order.shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-xl">
          <span>Total do pedido</span>
          <span>R$ {order.total.toFixed(2)}</span>
        </div>
      </div>
      <button className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 transition mt-4">
        Avaliar Produtos
      </button>
      <button
        onClick={handleBackToOrders}
        className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 transition mt-4"
      >
        Voltar aos meus pedidos
      </button>
    </div>
  );
};

export default OrderSummary;
