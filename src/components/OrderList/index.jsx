import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const navigate = useNavigate();
  
  const orders = [
    {
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
    },
    {
      id: '32600048',
      date: '15/01/2023',
      status: 'Pedido concluído.',
      payment: 'Pagamento via PIX.',
      items: [
        {
          name: 'Monitor Gamer LG 26 IPS',
          details: 'Ultra Wide, 75Hz, Full HD, 1ms, FreeSync Premium, HDR 10, 99% sRGB, HDMI, VESA - 26WQ500',
          quantity: 1,
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg',
        },
      ],
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (id) => {
    navigate(`/order/${id}`);
  };

  const handleBackToProfile = () => {
    navigate('/profile');
  };

  const currentItems = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">Meus Pedidos</h1>
      {currentItems.map((order, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg mb-4">
          <p className="font-bold text-gray-700">Pedido: {order.id} - {order.date}</p>
          <p className="text-green-600">{order.status}</p>
          <p className="text-gray-700">{order.payment}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
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
            onClick={() => handleViewDetails(order.id)}
            className="mt-4 bg-orange-600 text-white font-bold py-2 px-4 rounded hover:bg-orange-700 transition"
          >
            Ver Detalhes
          </button>
        </div>
      ))}
      <div className="flex justify-between">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          Página Anterior
        </button>
        <button
          disabled={currentItems.length < itemsPerPage}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          Próxima Página
        </button>
      </div>
      <button
        onClick={handleBackToProfile}
        className="mt-4 bg-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition"
      >
        Voltar ao Perfil
      </button>
    </div>
  );
};

export default OrderList;
