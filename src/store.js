// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import CategoryReducer from './slices/categorySlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import cartReducer from './slices/cartSlice';
import paymentReducer from './slices/paymentSlice';
import commentsReducer from './slices/commentsSlice';


export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: CategoryReducer,
    auth: authReducer,
    user: userReducer,
    order: orderReducer,
    cart: cartReducer,
    payment: paymentReducer,
    comments: commentsReducer
  },
});

export default store;
