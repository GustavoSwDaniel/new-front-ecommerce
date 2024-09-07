import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewOrder } from '../../slices/orderSlice';
import { clearCart, setOrderData } from '../../slices/cartSlice';
import { useLoading } from '../../context/LoadingContext';

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderData } = useSelector((state) => state.cart);
  const { status } = useSelector((state) => state.order);
  const { setLoading } = useLoading();

  const handlePaymentSelection = (method) => {
    setSelectedPaymentMethod(method);
  };

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status, setLoading]);

  const createOrder = async () => {
    let newOrder = {
      address_id: orderData.address_id,
      quote_type_id: orderData.quote_type_id,
      quote_type: orderData.quote_type,
      quote_value: orderData.quote_value,
      purchase_amount: orderData.total_value,
      total_value: orderData.total_value,
      paymentMethod: selectedPaymentMethod,
      items: orderData.items.map((item) => ({
        uuid: item.uuid,
        quantity: item.quantity,
      })),
    };

    if (selectedPaymentMethod === 'creditCard') {
      newOrder.paymentMethod = 'card';
      dispatch(setOrderData(newOrder));
      navigate(`/${selectedPaymentMethod}`);
      return;
    }

    const result = await dispatch(createNewOrder(newOrder));

    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(clearCart());
      navigate(`/${selectedPaymentMethod}`);
    } else {
      navigate('/payment');
      alert('Erro ao processar pagamento. Tente novamente ou escolha outro método.');
    }
  };

  const handleFinalizePurchase = () => {
    if (selectedPaymentMethod) {
      createOrder();
    } else {
      alert('Por favor, selecione um método de pagamento.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">Pagamento</h1>
        <div className="flex flex-wrap justify-between items-center mb-4 space-y-2 md:space-y-0">
          <div className="flex flex-wrap items-center justify-center md:justify-start space-x-2">
            <span className="text-gray-500">Carrinho</span>
            <span className="text-gray-500">→</span>
            <span className="text-gray-500">Identificação</span>
            <span className="text-gray-500">→</span>
            <span className="text-gray-900 font-bold">Pagamento</span>
            <span className="text-gray-500">→</span>
            <span className="text-gray-500">Finalização</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <span className="text-gray-700">R$ {orderData.total_value}</span>
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
