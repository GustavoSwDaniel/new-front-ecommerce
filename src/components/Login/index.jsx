import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';
import { login } from '../../slices/authSlice';
import React, { useState, useEffect, useCallback } from 'react';
import { addItem } from '../../slices/cartSlice';
import Cookie from 'js-cookie';
import { fetchCartItems} from '../../slices/cartSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { items } = useSelector((state) => state.cart.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const itemsToAdd = (cookieItens, field) => {
    console.log(cookieItens)
    return cookieItens.filter(item1 => 
      !items.some(item2 => item2[field] === item1[field])
    );
  }

  const addCart = async () => {
    const cart = JSON.parse(Cookie.get('cart'));
    dispatch(fetchCartItems());
    const newItems = itemsToAdd(cart, 'sku')
    if (newItems){
      newItems.forEach(element =>{
        dispatch(addItem(element.sku))
      })
      dispatch(fetchCartItems());
    }
  };



  const handleLogin = async (e) => {
    e.preventDefault();
    const user_data = { username: email, password: password };
    try {
      setLoading(true)
      await dispatch(login(user_data)).unwrap();
      addCart()
      setLoading(false)
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <input
              className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Entrar
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-purple-700 hover:text-purple-800"
              href="#"
            >
              Esqueceu a senha?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
