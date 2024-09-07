import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const RecommendedProducts = () => {
  const dispatch = useDispatch();
  const { item, status, error } = useSelector((state) => state.products);
  console.log(item)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {item.recomendations_products?.map(product => (
        <div key={product.id} className="border border-purple-300 p-4 rounded bg-white">
          <Link to={`/product/${product.sku}`}>
            <img src={product.image_url} alt={product.name} className="mb-4" />
            <h3 className="text-lg font-bold text-purple-700">{product.name}</h3>
            <p className="text-xl text-orange-500">R$ {product.stocks[0].price.toFixed(2)}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecommendedProducts;
