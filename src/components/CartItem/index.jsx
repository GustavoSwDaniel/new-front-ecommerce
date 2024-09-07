import React from 'react';
import { useLoading } from '../../context/LoadingContext';

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  const { setLoading } = useLoading();

  const handleRemove = () => {
    setLoading(true);
    onRemove(item.sku).finally(() => setLoading(false));
  };

  const handleIncrease = () => {
    setLoading(true);
    onIncrease(item.sku).finally(() => setLoading(false));
  };

  const handleDecrease = () => {
    setLoading(true);
    onDecrease(item.sku).finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-2">
      <img src={item.image_url} alt={item.name} className="w-20 h-20 object-contain" />
      <div className="flex flex-col flex-grow mx-4">
        <h3 className="font-bold text-lg text-gray-700">{item.name}</h3>
        <p className="text-gray-700">R$ {item.price ? parseFloat(item.price).toLocaleString('pt-BR') : '0,00'}</p>
        <div className="flex items-center">
          <button
            className="bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-l hover:bg-gray-400 transition"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="bg-gray-200 text-gray-700 font-bold py-1 px-4">{item.quantity_car}</span>
          <button
            className="bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-r hover:bg-gray-400 transition"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
      </div>
      <button
        className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition"
        onClick={handleRemove}
      >
        Remover
      </button>
    </div>
  );
};

export default CartItem;
