import React, { useState, useEffect } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simula a recuperação do histórico de pedidos
    const fetchOrderHistory = async () => {
      const orderData = [
        {
          id: 1,
          date: '2023-07-20',
          total: 226.90,
          items: [
            { name: 'Mouse Gamer Razer Deathadder Essential', quantity: 1, price: 226.90 },
          ],
        },
        {
          id: 2,
          date: '2023-06-15',
          total: 2829.99,
          items: [
            { name: 'Impressora 3D Creality K1', quantity: 1, price: 2829.99 },
          ],
        },
      ];
      setOrders(orderData);
    };

    fetchOrderHistory();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Histórico de Compras</h2>
      {orders.length === 0 ? (
        <p className="text-gray-700">Você ainda não fez nenhuma compra.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id} className="mb-4">
              <h3 className="text-xl font-bold text-gray-700 mb-2">Pedido #{order.id}</h3>
              <p className="text-gray-600">Data: {order.date}</p>
              <p className="text-gray-600">Total: R$ {order.total.toFixed(2)}</p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.quantity}x {item.name} - R$ {item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
