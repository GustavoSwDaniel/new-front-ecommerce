import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCartItems,
  removeCartItem,
  increaseQuantity,
  decreaseQuantity,
  updateParams,
  setOrderData
} from '../../slices/cartSlice';
import CartItem from '../../components/CartItem';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecommendedProducts from '../../components/RecommendedProducts';
import { useLoading } from '../../context/LoadingContext';
import { fetchUser } from '../../slices/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from 'js-cookie';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { items, cart_total, quoets, quoet_value, chosen_quote, cart_total_term, total_without_offer, offer } = useSelector((state) => state.cart.data);
  const { status, params } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const [cep, setCep] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [localItems, setLocalItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const token = Cookie.get('token');
    if (token) {
      dispatch(fetchCartItems());
      if (!userInfo || Object.keys(userInfo).length === 0) {
        dispatch(fetchUser());
      }
    } else {
      const cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : [];
      setLocalItems(cart);
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    return () => {
      dispatch(updateParams({ type_send: null }));
    };
  }, [location, dispatch]);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status, setLoading]);

  const handleRemoveItem = async (sku) => {
    const token = Cookie.get('token');
    if (token) {
      await dispatch(removeCartItem(sku));
    } else {
      let cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : [];
      cart = cart.filter(item => item.sku !== sku);
      Cookie.set('cart', JSON.stringify(cart), { expires: 7 });
      setLocalItems(cart);
      toast.success('Produto removido do carrinho temporário!');
    }
  };

  const handlePromoCodeChange = (cupon) => {
    dispatch(updateParams({ cuponDesconto: cupon }));
  };

  const handleIncreaseQuantity = async (sku) => {
    const token = Cookie.get('token');
    if (token) {
      await dispatch(increaseQuantity(sku));
    } else {
      let cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : [];
      cart = cart.map(item => item.sku === sku ? { ...item, quantity_car: item.quantity_car + 1 } : item);
      Cookie.set('cart', JSON.stringify(cart), { expires: 7 });
      setLocalItems(cart);
      toast.success('Quantidade aumentada no carrinho temporário!');
    }
  };

  const handleDecreaseQuantity = async (sku) => {
    const token = Cookie.get('token');
    if (token) {
      await dispatch(decreaseQuantity(sku));
    } else {
      let cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : [];
      cart = cart.map(item => item.sku === sku && item.quantity_car > 1 ? { ...item, quantity_car: item.quantity_car - 1 } : item);
      Cookie.set('cart', JSON.stringify(cart), { expires: 7 });
      setLocalItems(cart);
      toast.success('Quantidade diminuída no carrinho temporário!');
    }
  };

  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  const fetchShippingOptions = async (cep) => {
    await setShippingOptions(quoets);
  };

  const handleShippingChange = async (option) => {
    await dispatch(updateParams({ type_send: option }));
    await dispatch(fetchCartItems());
  };

  const applyPromoCode = () => {
    dispatch(fetchCartItems());
  };

  const createOrder = () => {
    const orderItems = Cookie.get('token') ? items : localItems;
    const order = {
      quote_type_id: params.type_send,
      quote_type: chosen_quote,
      address_id: userInfo?.user_address?.[0]?.id || null,
      quote_value: quoet_value,
      total_value: cart_total,
      purchase_amount: cart_total,
      orderSubtotalValue: total_without_offer,
      items: orderItems.map(item => ({
        uuid: item.sku,
        quantity: item.quantity_car
      }))
    };

    dispatch(setOrderData(order));
    navigate('/payment');
  };

  const handleCheckout = () => {
    const orderItems = Cookie.get('token') ? items : localItems;
    if (orderItems.length === 0) {
      toast.error('Carrinho vazio, não é possível finalizar a compra!');
      return;
    }
    if (params.type_send === '' || params.type_send === null) {
      alert("Escolha um tipo de frete");
    } else {
      createOrder();
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">Carrinho de Compras</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            {localItems.length === 0 && items.length === 0 ? (
              <p className="text-gray-700">Seu carrinho está vazio.</p>
            ) : (
              (Cookie.get('token') ? items : localItems).map(item => (
                <CartItem
                  key={item.sku}
                  item={item}
                  onRemove={handleRemoveItem}
                  onIncrease={handleIncreaseQuantity}
                  onDecrease={handleDecreaseQuantity}
                />
              ))
            )}
            <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-bold text-gray-700">Calcular Frete</h3>
              <div className="flex mt-2">
                <input
                  type="text"
                  value={cep}
                  onChange={handleCepChange}
                  placeholder="Digite seu CEP"
                  className="w-full p-2 border rounded-l"
                />
                <button
                  className="bg-purple-600 text-white font-bold py-2 px-4 rounded-r hover:bg-purple-700 transition"
                  onClick={() => fetchShippingOptions(cep)}
                >
                  OK
                </button>
              </div>
              {shippingOptions.length > 0 && (
                <div className="mt-2">
                  {shippingOptions.map(option => (
                    <div key={option.id} className="flex justify-between items-center text-gray-700 mt-2">
                      <span>{option.name} - {option.delivery_time} dias úteis</span>
                      <span>R$ {parseFloat(option.price).toFixed(2)}</span>
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={params?.type_send === option.id}
                        onChange={() => handleShippingChange(option.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Resumo do Pedido</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-gray-700">R$ {parseFloat(total_without_offer).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Frete</span>
              <span className="text-gray-700">
                {quoet_value ? `R$ ${parseFloat(quoet_value).toFixed(2)}` : 'Selecione uma opção'}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Desconto</span>
              <span className="text-gray-700">- R$ {parseFloat(offer).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>R$ {cart_total_term}</span>
            </div>
            <button
              className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 transition mt-4"
              onClick={handleCheckout}
            >
              Finalizar Compra
            </button>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-700">Código de Promoção</h3>
              <div className="flex mt-2">
                <input
                  type="text"
                  value={params.cuponDesconto}
                  onChange={(e) => handlePromoCodeChange(e.target.value)}
                  placeholder="Digite o código"
                  className="w-full p-2 border rounded-l"
                />
                <button
                  className="bg-purple-600 text-white font-bold py-2 px-4 rounded-r hover:bg-purple-700 transition"
                  onClick={applyPromoCode}
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Produtos Recomendados</h2>
          <RecommendedProducts />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
