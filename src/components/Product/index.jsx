import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookie from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecommendedProducts from '../../components/RecommendedProducts';


const Product = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [cep, setCep] = useState('');
  const [installments, setInstallments] = useState(0);

  useEffect(() => {
    // Simula a busca do produto pelo ID
    const fetchProductById = async (id) => {
      const productData = {
        name: "Produto Exemplo",
        image_url: "https://via.placeholder.com/500",
        price: 3254.07,
        description: "Descrição do produto",
        physical_characteristics: {
          Peso: "1kg",
          Dimensões: "10x20x30cm",
        },
        sku: id,
      };

      setItem(productData);
      setInstallments((productData.price / 12).toFixed(2));
    };

    fetchProductById(id);
  }, [id]);

  const addCart = (item) => {
    if (!Cookie.get('token')) {
      if (!Cookie.get('cart')) {
        Cookie.set('cart', JSON.stringify({
          items: [{
            product_uuid: item.sku,
            quantity: 1
          }]
        }));
      } else {
        let cart = JSON.parse(Cookie.get('cart'));
        let product = {
          product_uuid: item.sku,
          quantity: 1 
        };
        cart.items.push(product);
        Cookie.set('cart', JSON.stringify(cart));
      }
    } else {
      // Lógica para adicionar ao carrinho quando logado
    }
    toast.success("Item adicionado ao carrinho!");
  };

  const formatCEP = () => {
    let value = cep.replace(/\D/g, '');
    value = value.substring(0, 8);
    value = value.replace(/(\d{5})(\d{3})/g, '$1-$2');
    setCep(value);
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 flex justify-center">
          <img src={item.image_url} alt={item.name} className="w-4/4 h-auto rounded-lg" />
        </div>
        <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-purple-700 mb-2">{item.name}</h1>
          <div className="flex items-center justify-between mb-4">
            <p className="text-3xl text-red-600 font-bold">R$ {item.price?.toLocaleString('pt-BR')}</p>
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
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
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
      <div className="mt-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Produtos Recomendados</h2>
          <RecommendedProducts />
        </div>
    </div>
  );
};

export default Product;
