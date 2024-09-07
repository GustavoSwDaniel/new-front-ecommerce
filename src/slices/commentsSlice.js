import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookie from 'js-cookie';

export const createComment = createAsyncThunk('comments/createComments', async (commentData, { rejectWithValue }) => {
  try {
    const token = Cookie.get('token');
    const response = await axios.post('http://localhost:8081/comments', commentData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getComments = createAsyncThunk('comments/getComments', async (params) => {
  console.log(params);
  try {
    const token = Cookie.get('token');
    const response = await axios.get(`http://localhost:8081/comments/${params.product_id}?limit=${params.limit}&offset=${params.offset}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: {
      total: 0,
      data: [],
      offset: 0,
      limit: 0,
      }
    },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default commentsSlice.reducer;
