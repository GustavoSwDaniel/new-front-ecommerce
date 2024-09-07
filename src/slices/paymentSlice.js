// src/slices/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookie from 'js-cookie';


// Defina o thunk para buscar categorias
export const createPayment = createAsyncThunk('payment/getCategory', async (order) => {
    const token = Cookie.get('token');
    const response = await axios.post(`http://localhost:8081/orders`, order, 
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    );
  return response.data;
});

const paymentSlice = createSlice({
  name: 'categories',
  initialState: {
    orderData: {
        quote_type_id: '',
        quote_type: '',
        address_id: null,
        quote_value: 0,
        total_value: 0 ,
        orderSubtotalValue: 0,
        items: []
    },
    paymentResponse: {
        uuid: '',
        paymentInfo: {
            billingType: '',
            value: '',
            encodedImage: '',
            code: '',
        }
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.paymentResponse = action.payload;
      })
  },
});

export default paymentSlice.reducer;
