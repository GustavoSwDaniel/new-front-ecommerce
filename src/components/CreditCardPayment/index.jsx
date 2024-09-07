import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { clearCart } from '../../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createNewOrder } from '../../slices/orderSlice';
import { useLoading } from '../../context/LoadingContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CreditCardPayment = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const dispatch = useDispatch();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const { orderData } = useSelector((state) => state.cart);

  const changePage = async(page) => {
    navigate(`/${page}`);
  }

  const createOrder = async () => {
    setLoading(true);

    const newOrder = {
      address_id: orderData.address_id,
      quote_type_id: orderData.quote_type_id,
      quote_type: orderData.quote_type,
      quote_value: orderData.quote_value,
      purchase_amount: orderData.total_value,
      total_value: orderData.total_value,
      paymentMethod: 'card',
      card_info: {
        name: state.name,
        number: state.number,
        expiry_month: state.expiry.split('/')[0],
        expiry_year: state.expiry.split('/')[1],
        cvv: state.cvc,
      },
      items: orderData.items.map((item) => ({
        uuid: item.uuid,
        quantity: item.quantity,
      })),
    };

    const result = await dispatch(createNewOrder(newOrder));

    if (result.meta.requestStatus === 'fulfilled') {
      setPaymentSuccess(true);
      setTimeout(() => {
        dispatch(clearCart());
        navigate('/');
      }, 3000);
    } else {
      setPaymentError(true);
    }
    setLoading(false);
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    let formattedValue = value;

    if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{2})/, '$1/$2')
        .slice(0, 5);
    }

    if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setState((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">Pagamento com Cartão de Crédito</h1>
      <div className="mb-6">
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
      </div>
      <div className="space-y-6">
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2">Número do Cartão</label>
          <input
            type="text"
            name="number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label className="text-gray-700 mb-2">Validade</label>
            <input
              type="text"
              name="expiry"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="MM/AA"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-gray-700 mb-2">CVV</label>
            <input
              type="text"
              name="cvc"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="123"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2">Nome do Titular</label>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Nome como no cartão"
          />
        </div>
      </div>
      <button
        onClick={createOrder}
        className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition mt-6"
      >
        Realizar Pagamento
      </button>

      {paymentSuccess && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-9xl animate-bounce" />
          <span className="ml-4 text-4xl font-bold text-green-500">Pagamento realizado com sucesso!</span>
        </div>
      )}

      {paymentError && (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 cursor-pointer" onClick={() => changePage('payment')}>
          <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-9xl animate-bounce" />
          <span className="ml-4 text-4xl font-bold text-red-500">Erro ao realizar pagamento! Tente novamente.</span>
          <span className="ml-4 text-4xl font-bold text-red-500">Tente de novo, ou tenta outro metodo de pagamento</span>
        </div>
      )}
    </div>
  );
};

export default CreditCardPayment;
