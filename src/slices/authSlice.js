import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookie from 'js-cookie';

export const login = createAsyncThunk('auth/login', async (credentials) => {
  let formData = new FormData();
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);

  const response = await axios.post(`http://localhost:8081/user/auth`, formData);
  
  Cookie.set('token', response.data.access_token);
  Cookie.set('uuid', response.data.uuid);
  Cookie.set('name', response.data.name);

  return response.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  Cookie.remove('token');
  Cookie.remove('uuid');
  Cookie.remove('name');
  Cookie.remove('cartLen');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    uuid: null,
    name: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.access_token;
        state.uuid = action.payload.uuid;
        state.name = action.payload.name;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.uuid = null;
        state.name = null;
      });
  },
});

export default authSlice.reducer;
