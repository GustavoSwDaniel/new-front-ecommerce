import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/CartItem';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecommendedProducts from '../../components/RecommendedProducts';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cep, setCep] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Simula a recuperação dos itens do carrinho
    const fetchCartItems = async () => {
      const items = [
        { id: 1, name: "Mouse Gamer Razer Deathadder Essential", price: 226.90, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg" },
        { id: 2, name: "Impressora 3D Creality K1", price: 2829.99, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg" },
      ];
      setCartItems(items);
    };

    fetchCartItems();
  }, []);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    const shippingCost = selectedShipping ? selectedShipping.price : 0;
    return (subtotal + shippingCost - discount).toFixed(2);
  };

  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  const fetchShippingOptions = async (cep) => {
    // Simula a recuperação das opções de frete
    const options = [
      { type: 'Sedex', price: 20.00, estimatedTime: '2-3 dias úteis' },
      { type: 'PAC', price: 10.00, estimatedTime: '5-7 dias úteis' },
      { type: 'Transportadora', price: 30.00, estimatedTime: '1-2 dias úteis' },
    ];
    setShippingOptions(options);
  };

  const handleShippingChange = (option) => {
    setSelectedShipping(option);
  };

  const applyPromoCode = () => {
    // Simula a aplicação de um código de promoção
    if (promoCode === 'DESCONTO10') {
      setDiscount(10.00);
    }
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">Carrinho de Compras</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            {cartItems.length === 0 ? (
              <p className="text-gray-700">Seu carrinho está vazio.</p>
            ) : (
              cartItems.map(item => (
                <CartItem key={item.id} item={item} onRemove={removeItem} />
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
                    <div key={option.type} className="flex justify-between items-center text-gray-700 mt-2">
                      <span>{option.type} - {option.estimatedTime}</span>
                      <span>R$ {option.price.toFixed(2)}</span>
                      <input
                        type="checkbox"
                        checked={selectedShipping?.type === option.type}
                        onChange={() => handleShippingChange(option)}
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
              <span className="text-gray-700">R$ {cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Frete</span>
              <span className="text-gray-700">
                {selectedShipping ? `R$ ${selectedShipping.price.toFixed(2)}` : 'Selecione uma opção'}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Desconto</span>
              <span className="text-gray-700">R$ {discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>R$ {calculateTotal()}</span>
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
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
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
