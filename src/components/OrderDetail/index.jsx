import React from 'react';
import OrderSummary from '../../components/OrderSummary';
import OrderTracking from '../../components/OrderTracking';

const OrderDetail = () => {
  const order = {
    id: '27910968',
    date: '16/01/2022',
    status: 'Pedido concluído.',
    paymentMethod: 'Pagamento via CARTÃO DE CRÉDITO.',
    installments: '2x sem juros',
    totalProducts: 70.47,
    shipping: 17.15,
    total: 87.62,
    items: [
      {
        name: 'Lâmpada KaBuM! Smart, RGB + Branco, 10W, Google Home e Alexa, Conexão E27 - KBSB015',
        quantity: 1,
        price: 70.47,
        img: 'https://via.placeholder.com/150'
      }
    ],
    tracking: {
      carrier: 'Sedex',
      code: 'OK821955668BR',
      events: [
        { date: '16/01/2022', time: '23:17', status: 'Pedido recebido' },
        { date: '17/01/2022', time: '07:56', status: 'Enviado para a transportadora' },
        { date: '17/01/2022', time: '18:56', status: 'Recebido pela transportadora' },
        { date: '19/01/2022', time: '12:37', status: 'Pedido entregue' }
      ]
    },
    address: 'Rua Francisco Candido Do Ribeiro, 168, vila Britania, 168, Casa, Campos do Jordão, SP'
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">Detalhes do Pedido</h1>
        <OrderSummary order={order} />
        <OrderTracking tracking={order.tracking} />
      </div>
    </div>
  );
};

export default OrderDetail;
