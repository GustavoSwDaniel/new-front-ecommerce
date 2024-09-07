import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookie from 'js-cookie';

export const createUser = createAsyncThunk('user/createUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8081/users', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const token = Cookie.get('token');
  const response = await axios.get('http://localhost:8081/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
