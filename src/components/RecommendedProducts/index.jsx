import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedProducts = () => {
  const products = [
    { id: 1, name: "Teclado Mecânico Gamer", price: 499.90, img: "https://via.placeholder.com/150" },
    { id: 2, name: "Headset Gamer", price: 299.90, img: "https://via.placeholder.com/150" },
    { id: 3, name: "Monitor 144Hz", price: 1499.90, img: "https://via.placeholder.com/150" },
    { id: 4, name: "Mousepad RGB", price: 99.90, img: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <div key={product.id} className="border border-purple-300 p-4 rounded bg-white">
          <Link to={`/product/${product.id}`}>
            <img src={product.img} alt={product.name} className="mb-4" />
            <h3 className="text-lg font-bold text-purple-700">{product.name}</h3>
            <p className="text-xl text-orange-500">R$ {product.price.toFixed(2)}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecommendedProducts;
