// src/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:8081/products'); // Substitua pela URL da sua API
  return response.data;
});

export const fetchProductByDepartments = createAsyncThunk('products/fetchProductByDepartments', async (category_uuid) => {
  const response = await axios.get(`http://localhost:8081/products?category=${category_uuid}`); // URL para buscar detalhes de um produto
  return response.data;
});

export const fetchProductByUuid = createAsyncThunk('products/fetchProductByUuid', async (product_uuid) => {
  const response = await axios.get(`http://localhost:8081/products/${product_uuid}`, ); // URL para adicionar um novo produto
  return response.data;
});

export const fetchProductByName = createAsyncThunk('products/fetchProductByName', async (name) => {
  const response = await axios.get(`http://localhost:8081/products?name=${name}`, ); // URL para adicionar um novo produto
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: {
      total: 0,
      offset: 0,
      count: 0,
      data: []
    },
    item: {},
    status: 'idle',
    error: null,
    productDetails: null,
    addProductStatus: 'idle',
    addProductError: null,
    searchResults: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Requisição de detalhes do produto
      .addCase(fetchProductByDepartments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByDepartments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(fetchProductByDepartments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductByUuid.pending, (state) => {
        state.addProductStatus = 'loading';
      })
      .addCase(fetchProductByUuid.fulfilled, (state, action) => {
        state.addProductStatus = 'succeeded';
        state.item= action.payload 
      })
      .addCase(fetchProductByUuid.rejected, (state, action) => {
        state.addProductStatus = 'failed';
      })
      .addCase(fetchProductByName.pending, (state) => {
        state.addProductStatus = 'loading';
      })
      .addCase(fetchProductByName.fulfilled, (state, action) => {
        state.addProductStatus = 'succeeded';
        state.searchResults=action.payload 
      })
      .addCase(fetchProductByName.rejected, (state, action) => {
        state.addProductStatus = 'failed';
      });
      
  },
});

export default productSlice.reducer;
