import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const isLoggedIn = true;
  const userName = "John Doe";
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.length >= 3) {
      // Simulate an API call to get search suggestions with images
      const fakeSuggestions = [
        {
          name: "Placa de Vídeo RX 6600",
          img: "https://via.placeholder.com/50"
        },
        {
          name: "Placa Mãe MSI B450",
          img: "https://via.placeholder.com/50"
        },
        {
          name: "Placa Mãe Asus TUF",
          img: "https://via.placeholder.com/50"
        },
        {
          name: "Placa de Vídeo GTX 1650",
          img: "https://via.placeholder.com/50"
        },
        {
          name: "Processador Ryzen 5 3600",
          img: "https://via.placeholder.com/50"
        },
      ].filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      setSuggestions(fakeSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    navigate(`/search?query=${suggestion}`);
    setSuggestions([]);
  };

  return (
    <header className="bg-purple-700 p-2 text-white flex flex-col items-center">
      <div className="flex justify-between items-center w-full max-w-6xl">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="EnowShop Logo" className="h-24 mr-3" /> 
          </Link>
        </div>
        <div className="flex items-center w-full justify-center">
          <div ref={wrapperRef} className="relative w-1/2 max-w-lg">
            <form onSubmit={handleSearchSubmit}>
              <input 
                type="text" 
                placeholder="Pesquise" 
                className="p-2 rounded w-full text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-0 top-0 bottom-0 p-2 bg-purple-500 rounded-r text-white hover:bg-purple-600" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white text-gray-800 border border-gray-300 rounded mt-1 max-h-48 overflow-auto z-10">
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={index} 
                    className="p-2 cursor-pointer hover:bg-gray-200 flex items-center"
                    onClick={() => handleSuggestionClick(suggestion.name)}
                  >
                    <img src={suggestion.img} alt={suggestion.name} className="w-10 h-10 object-contain mr-2" />
                    <span>{suggestion.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span>Olá, {userName}</span>
              <Link to="/profile" className="hover:text-yellow-400">
                <FontAwesomeIcon icon={faUser} className="text-2xl" />
              </Link>
            </div>
          ) : (
            <Link to="/login" className="hover:text-yellow-400 flex items-center">
              <FontAwesomeIcon icon={faUser} className="text-2xl" />
              <span className="ml-2">Faça LOGIN ou crie seu CADASTRO</span>
            </Link>
          )}
          <Link to="/cart" className="hover:text-yellow-400">
            <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
          </Link>
        </div>
      </div>
      <nav className="mt-4 w-full max-w-6xl">
        <ul className="flex space-x-4 justify-center">
          <li><Link to="/search?department=departamentos" className="hover:text-yellow-400">Departamentos</Link></li>
          <li><Link to="/search?department=monte-seu-pc" className="hover:text-yellow-400">Monte seu PC</Link></li>
          <li><Link to="/search?department=oferta-do-dia" className="hover:text-yellow-400">Oferta do Dia</Link></li>
          <li><Link to="/search?department=cupons" className="hover:text-yellow-400">Cupons</Link></li>
          <li><Link to="/search?department=entrega-flash" className="hover:text-yellow-400">Entrega Flash</Link></li>
          <li><Link to="/search?department=baixe-o-app" className="hover:text-yellow-400">Baixe o App</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
