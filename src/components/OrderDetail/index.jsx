import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderByUuid } from '../../slices/orderSlice';
import OrderSummary from '../../components/OrderSummary';
import OrderTracking from '../../components/OrderTracking';
import { format } from 'date-fns';


const OrderDetail = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, status, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (uuid) {
      dispatch(fetchOrderByUuid(uuid));
    }
  }, [uuid, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!orderDetails) {
    return <div>No order found.</div>;
  }
  const tracking = {
    carrier: 'Sedex',
    code: 'OK821955668BR',
    events: [
      { date: '16/01/2022', time: '23:17', status: 'Pedido recebido' },
      { date: '17/01/2022', time: '07:56', status: 'Enviado para a transportadora' },
      { date: '17/01/2022', time: '18:56', status: 'Recebido pela transportadora' },
      { date: '19/01/2022', time: '12:37', status: 'Pedido entregue' }
    ]
  }
  const shippingCost = orderDetails.shipping ? parseFloat(orderDetails.shipping) : 0;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">Detalhes do Pedido</h1>
        {orderDetails && (
          <>
            <OrderSummary order={{
              id: orderDetails.uuid,
              date: format(new Date(orderDetails.created_at), 'dd/MM/yyyy HH:mm:ss'),
              status: orderDetails.status,
              paymentMethod: `Pagamento via ${orderDetails.payment_method}`,
              installments: 'N/A', 
              totalProducts: parseFloat(orderDetails.total_amount),
              shipping: shippingCost,
              total: parseFloat(orderDetails.total_amount) + shippingCost,
              items: orderDetails.order_items?.map(item => ({
                name: item.product.name,
                quantity: item.quantity,
                id: item.product.id,
                img: item.product.image_url,
                is_rated: item.is_rated
              })),
              address: `${orderDetails.address.street}, ${orderDetails.address.number}, ${orderDetails.address.village}, ${orderDetails.address.city}, ${orderDetails.address.state}, ${orderDetails.address.cep}, ${orderDetails.address.complement}`,
            }} />
            <OrderTracking tracking={tracking} /> 
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
