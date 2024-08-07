import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4">
      <img src={item.img} alt={item.name} className="w-20 h-20 object-contain rounded-lg" />
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-bold text-purple-700">{item.name}</h3>
        <p className="text-red-600">R$ {item.price.toLocaleString('pt-BR')}</p>
      </div>
      <button onClick={() => onRemove(item.id)} className="text-red-600 hover:text-red-800">
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default CartItem;
