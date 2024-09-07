import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookie from 'js-cookie';

// Async thunk para buscar os pedidos do usuário
export const fetchUserOrders = createAsyncThunk('orders/fetchUserOrders', async (params) => {
  const token = Cookie.get('token');
  const response = await axios.get(`http://localhost:8081/order/user?limit=${params.limit}&offset=${params.offset}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
});

// Async thunk para buscar o pedido por UUID
export const fetchOrderByUuid = createAsyncThunk('orders/fetchOrderByUuid', async (uuid) => {
  const response = await axios.get(`http://localhost:8081/orders/${uuid}`);
  return response.data;
});

// Async thunk para criar um novo pedido
export const createNewOrder = createAsyncThunk('orders/createNewOrder', async (order) => {
  const token = Cookie.get('token');
  const response = await axios.post('http://localhost:8081/orders', order, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Corrigido para retornar os dados do pedido criado
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: {
      total: 0,
      data: [],
      offset: 0,
      limit: 0,
    },
    orderDetails: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchOrderByUuid.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderByUuid.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderByUuid.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createNewOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderDetails = action.payload;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
