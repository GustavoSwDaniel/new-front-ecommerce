import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import ProductPage from './pages/ProductPage/ProductPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import CrediCardPaymentPage from './pages/CrediCardPaymentPage/CrediCardPaymentPage';
import PixPaymentPage from './pages/PixPaymentPage/PixPaymentPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import Cart from './pages/Cart/Cart';
import OrderPage from './pages/OrderPage/OrderPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';


import { useParams } from 'react-router-dom';




const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/pix" element={<PixPaymentPage />} />
      <Route path="/creditCard" element={<CrediCardPaymentPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/order/:uuid" element={<OrderPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
    </Routes>
  );
};

export default Routers;