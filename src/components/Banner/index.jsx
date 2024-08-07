import React from 'react';

const Banner = () => {
  return (
    <div className="bg-purple-800 text-white p-6 text-center rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-2">Ofertas do Dia</h1>
      <p className="text-lg text-gray-200">Confira as melhores ofertas de hoje!</p>
      <div className="mt-4">
        <a href="#ofertas" className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors">
          Ver Ofertas
        </a>
      </div>
    </div>
  );
};

export default Banner;
