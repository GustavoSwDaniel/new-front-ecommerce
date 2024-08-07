import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faList, faThLarge } from '@fortawesome/free-solid-svg-icons';

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const department = new URLSearchParams(location.search).get('department');
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    // Simulate an API call to fetch search results
    const fakeResults = Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      name: `Produto ${index + 1}`,
      price: 1369.99,
      oldPrice: 2117.64,
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg',
      discount: Math.floor(Math.random() * 30) + 1,
      rating: Math.floor(Math.random() * 5) + 1,
      reviews: Math.floor(Math.random() * 1000)
    }));
    setResults(fakeResults);
  }, [query, department]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentItems = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">
        Resultados da Pesquisa: {query || department}
      </h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faSort} className="text-gray-500 mr-2" />
            <label className="mr-2">Ordenar:</label>
            <select className="p-2 border rounded">
              <option>Mais procurados</option>
              <option>Menor preço</option>
              <option>Maior preço</option>
              <option>Melhor avaliação</option>
            </select>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faList} className="text-gray-500 mr-2" />
            <label className="mr-2">Exibir:</label>
            <select className="p-2 border rounded">
              <option>20 por página</option>
              <option>50 por página</option>
              <option>100 por página</option>
            </select>
          </div>
        </div>
        <div>
          <span>{results.length} produtos</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {currentItems.map((item) => (
          <Link key={item.id} to={`/product/${item.id}`} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center h-full">
            <div className="flex justify-between items-center w-full mb-2">
              <span className="text-orange-600 font-bold">{item.discount}% OFF</span>
              <span className="text-gray-500">{item.rating}★ ({item.reviews})</span>
            </div>
            <img src={item.img} alt={item.name} className="w-32 h-32 object-contain mb-4" />
            <h3 className="font-bold text-gray-700 text-center">{item.name}</h3>
            <p className="text-gray-500 line-through">R$ {item.oldPrice.toFixed(2)}</p>
            <p className="text-orange-600 font-bold">R$ {item.price.toFixed(2)}</p>
            <p className="text-gray-500 text-sm">À vista no PIX</p>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(results.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${index + 1 === currentPage ? 'bg-purple-700 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
