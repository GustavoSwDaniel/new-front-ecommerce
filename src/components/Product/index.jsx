import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByUuid } from '../../slices/productSlice';
import { addItem } from '../../slices/cartSlice';
import ProductCarousel from '../../components/Carousel';
import ProductComments from '../../components/ProductComments';
import Cookies from 'js-cookie';

const Product = () => {
  const { id } = useParams();
  const [cep, setCep] = useState('');
  const [installments, setInstallments] = useState(0);
  const dispatch = useDispatch();
  const { item, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductByUuid(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (item) {
      setInstallments((item.price / 12).toFixed(2));
    }
  }, [item]);

  const addCart = useCallback((item) => {
    const token = Cookies.get('token');

    if (token) {
      // Usuário está autenticado, adicionar ao carrinho normalmente
      dispatch(addItem(item.sku));
      toast.success("Item adicionado ao carrinho!");
    } else {
      // Usuário não autenticado, salvar produto no cookie
      let cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
      
      const productExists = cart.some(cartItem => cartItem.sku === item.sku);
      if (!productExists) {
        // Adicionar quantidade como 1
        cart.push({ ...item, quantity_car: 1 });
        Cookies.set('cart', JSON.stringify(cart), { expires: 7 }); // Salvar o carrinho no cookie com expiração de 7 dias
        toast.success("Produto salvo no carrinho temporário!");
      } else {
        toast.info("Produto já está no carrinho temporário!");
      }
    }
  }, [dispatch]);

  const formatCEP = () => {
    let value = cep.replace(/\D/g, '');
    value = value.substring(0, 8);
    value = value.replace(/(\d{5})(\d{3})/g, '$1-$2');
    setCep(value);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 border border-gray-300 rounded-lg">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4  rounded-lg p-4">
        <div className="md:col-span-2 flex justify-center border border-gray-300 shadow-md rounded-lg p-4">
          <img src={item.image_url} alt={item.name} className="w-2/4 h-auto rounded-lg" />
        </div>
        <div className="flex flex-col p-4 bg-white rounded-lg shadow-md border border-gray-300">
          <h1 className="text-3xl font-bold text-purple-700 mb-2">{item.name}</h1>
          <div className="flex items-center justify-between mb-4">
            <p className="text-3xl text-red-600 font-bold">R$ {item.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-gray-500">12x de R$ {installments} sem juros</p>
          </div>
          <button className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 transition mb-2" onClick={() => addCart(item)}>
            Adicionar ao carrinho
            <FontAwesomeIcon icon={faCartShopping} className="ml-2" />
          </button>
          <button className="w-full bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700 transition">
            Comprar agora
          </button>
          <div className="mt-4">
            <h2 className="text-lg font-bold text-gray-700">Consultar frete e prazo de entrega</h2>
            <div className="flex mt-2">
              <input 
                type="text" 
                value={cep} 
                onChange={(e) => setCep(e.target.value)} 
                placeholder="Digite seu CEP" 
                className="w-full p-2 border rounded-l"
                onInput={formatCEP} 
              />
              <button className="bg-purple-600 text-white font-bold py-2 px-4 rounded-r hover:bg-purple-700 transition">
                OK
              </button>
            </div>
            <a className="text-blue-600 hover:underline mt-2 inline-block" href="https://buscacepinter.correios.com.br/app/endereco/index.php?t">Não lembro meu CEP</a>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md mt-4 border border-gray-300">
        <h2 className="text-2xl font-bold text-purple-700 mb-2">Descrição</h2>
        <p className="text-gray-700">{item.description}</p>
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-700">Características Físicas</h3>
          <ul className="list-disc list-inside text-gray-700">
            {Object.entries(item.physical_characteristics || {}).map(([key, value]) => (
              <li key={key}>{value}: {key}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 border border-gray-300 shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Produtos Recomendados</h2>
        {item.recomendations_products?.length > 0 ? (
          <ProductCarousel items={item.recomendations_products} />
        ) : (
          <p>Nenhum produto recomendado disponível.</p>
        )}
      </div>
      <div className="border border-gray-300 shadow-md rounded-lg mt-4">
        <ProductComments />
      </div>
    </div>
  );
};

export default Product;
