import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartCount } from '../../slices/cartSlice';
import { fetchProductByName } from '../../slices/productSlice';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.cartCount);
  const { searchResults, status, error } = useSelector((state) => state.products);


  useEffect(() => {
    const token = Cookie.get('token');
    if (token) {
      setIsLoggedIn(true);
      const name = Cookie.get('name');
      setUserName(name || 'Usuário');
    }
    dispatch(fetchCartCount());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      dispatch(fetchProductByName(searchTerm))
        .then((result) => {
          if (result.payload && result.payload.data) {
            setSuggestions(result.payload.data.slice(0, 3));
          } else {
            setSuggestions([]);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar os produtos:", error);
          setSuggestions([]);
        });
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

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

  const handleLogout = () => {
    Cookie.remove('token');
    Cookie.remove('name');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
  };

  return (
    <header className="bg-purple-700 p-2 text-white flex flex-col items-center w-full">
      <div className="flex flex-wrap justify-between items-center w-full max-w-6xl p-2">
        <div className="flex items-center flex-shrink-0">
          <Link to="/">
            <img src={logo} alt="EnowShop Logo" className="h-12 md:h-24 mr-3" /> 
          </Link>
        </div>

        <div className="flex items-center w-full md:w-3/4 lg:w-1/2 justify-center mt-2 md:mt-0">
          <div ref={wrapperRef} className="relative w-full">
            <form onSubmit={handleSearchSubmit} className="flex">
              <input 
                type="text" 
                placeholder="Pesquise" 
                className="p-2 rounded-l w-full text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="p-2 bg-purple-500 rounded-r text-white hover:bg-purple-600" type="submit">
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
                    <img src={suggestion.image_url} alt={suggestion.name} className="w-10 h-10 object-contain mr-2" />
                    <span>{suggestion.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-6 mt-2 md:mt-0">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span>Olá, {userName}</span>
              <Link to="/profile" className="hover:text-yellow-400">
                <FontAwesomeIcon icon={faUser} className="text-3xl" />
              </Link>
              <button onClick={handleLogout} className="hover:text-yellow-400">
                Sair
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-yellow-400 flex items-center">
              <FontAwesomeIcon icon={faUser} className="text-3xl" />
              <span className="ml-2 hidden md:inline">Faça LOGIN ou crie seu CADASTRO</span>
            </Link>
          )}
          <Link to="/cart" className="hover:text-yellow-400 relative">
            <FontAwesomeIcon icon={faShoppingCart} className="text-3xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center shadow-lg">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
