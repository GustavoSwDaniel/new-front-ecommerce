import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faHeadset, faFileAlt } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const navigate = useNavigate();

  const lastOrder = {
    id: '40104202',
    date: '02/08/2024',
    status: 'Pedido concluído.',
    payment: 'Pagamento via PIX.',
    items: [
      {
        name: 'Processador AMD Ryzen 5 5600X',
        details: '3.7GHz (4.6GHz Max Turbo), Cache 35MB, 6 Núcleos, 12 Threads, AM4',
        quantity: 1,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg',
      },
      {
        name: 'Memória RAM Kingston Fury Beast',
        details: '8GB, 3200MHz, DDR4, CL16, Preto - KF432C16BB/8',
        quantity: 2,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg',
      },
    ],
  };

  const handleViewOrderDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-purple-700">Bem-vindo, Elizabete Pereira</h1>
            <p className="text-gray-500">gustavobrgamer@gmail.com</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Resumo do Seu Último Pedido</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
          <p className="font-bold text-gray-700">Pedido: {lastOrder.id} - {lastOrder.date}</p>
          <p className="text-green-600">{lastOrder.status}</p>
          <p className="text-gray-700">{lastOrder.payment}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {lastOrder.items.map((item, index) => (
              <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow">
                <img src={item.img} alt={item.name} className="w-16 h-16 object-contain mr-4" />
                <div>
                  <h3 className="font-bold text-gray-700">{item.name}</h3>
                  <p className="text-gray-500">{item.details}</p>
                  <p className="text-gray-500">Quantidade: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleViewOrderDetails(lastOrder.id)}
            className="mt-4 bg-orange-600 text-white font-bold py-2 px-4 rounded hover:bg-orange-700 transition"
          >
            Ver Detalhes do Pedido
          </button>
        </div>
        <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">Atalhos</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link to="/orders" className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition text-center">
            <FontAwesomeIcon icon={faShoppingCart} className="text-3xl text-orange-600 mb-2" />
            <p className="font-bold text-gray-700">Meus Pedidos</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
