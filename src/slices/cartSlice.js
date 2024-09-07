import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "js-cookie";

const axiosCart = axios.create({
  baseURL: "http://localhost:8081/",
});

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (params, { getState }) => {
    const token = Cookie.get("token");
    if (token) {
      const response = await axiosCart.get(`/car`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: getState().cart.params,
      });
      const data = response.data;
      data.items = data.items.map((item) => ({
        ...item,
        price: parseFloat(item.price),
        quantity_car: parseFloat(item.quantity_car),
      }));
      return data;
    } else {
      const cart = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart"))
        : { items: [] };
      const data = {
        ...cart,
        cart_total: "0.00",
        cart_total_term: "0.00",
        cash: "0.00",
        offer: "0.00",
        quoet_value: null,
        quoets: [],
      };
      data.items = data.items.map((item) => ({
        ...item,
        price: parseFloat(item.price),
        quantity_car: parseFloat(item.quantity_car),
      }));
      return data;
    }
  }
);

export const fetchCartCount = createAsyncThunk(
  "cart/fetchCartCount",
  async () => {
    const token = Cookie.get("token");
    if (token) {
      const response = await axiosCart.get(`/car/lenght`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.lenght;
    } else {
      const cart = Cookie.get("cart") ? JSON.parse(Cookie.get("cart")) : { items: [] };
      const count = cart.items.reduce((total, item) => total + item.quantity, 0);
      return count;
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (sku, { dispatch, getState }) => {
    const token = Cookie.get("token");
    if (token) {
      await axiosCart.delete(`/car/item/${sku}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchCartCount());
      dispatch(fetchCartItems());
      return sku;
    }
    const state = getState();
    const updatedItems = state.cart.data.items.filter(
      (item) => item.sku !== sku
    );
    Cookie.set(
      "cart",
      JSON.stringify({ ...state.cart.data, items: updatedItems })
    );
    dispatch(fetchCartCount());
    return sku;
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (data, { dispatch, getState }) => {
    const token = Cookie.get("token");

    if (token) {
      try {
        const payload = {
          quantity: data.quantity_car,
        };

        const response = await axiosCart.put(`/car/item/${data.sku}`, payload, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });
        
        dispatch(fetchCartItems());
        dispatch(fetchCartCount());
        return { ...data, quantity_car: response.data.quantity_car };
      } catch (error) {
        console.error("Error updating item quantity in cart", error);
        return Promise.reject(error.response?.data || error.message);
      }
    } else {
      const state = getState();
      const updatedItems = state.cart.data.items.map((item) =>
        item.sku === data.sku ? { ...item, quantity_car: data.quantity_car } : item
      );

      const updatedCart = { ...state.cart.data, items: updatedItems };
      Cookie.set("cart", JSON.stringify(updatedCart));

      dispatch(fetchCartCount());
      return updatedCart;
    }
  }
);

export const addItem = createAsyncThunk(
  "cart/addItem",
  async (product_uuid, { dispatch, getState }) => {
    const token = Cookie.get("token");
    if (token) {
      const payload = { product_uuid };
      const response = await axiosCart.put("/car", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchCartCount());
      dispatch(fetchCartItems());
      return response.data;
    } else {
      const state = getState();
      const existingItem = state.cart.data.items.find(
        (item) => item.product_uuid === product_uuid
      );

      let updatedItems;
      if (existingItem) {
        updatedItems = state.cart.data.items.map((item) =>
          item.product_uuid === product_uuid
            ? { ...item, quantity_car: item.quantity_car + 1 }
            : item
        );
      } else {
        updatedItems = [
          ...state.cart.data.items,
          { product_uuid, quantity_car: 1 },
        ];
      }

      const updatedCart = { ...state.cart.data, items: updatedItems };
      Cookie.set("cart", JSON.stringify(updatedCart));
      dispatch(fetchCartCount());
      return updatedCart;
    }
  }
);

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (sku, { dispatch, getState }) => {
    const state = getState();
    const item = state.cart.data.items.find((item) => item.sku === sku);
    const updatedItem = { ...item, quantity_car: item.quantity_car + 1 };
    await dispatch(updateQuantity(updatedItem));
    return updatedItem;
  }
);

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (sku, { dispatch, getState }) => {
    const state = getState();
    const item = state.cart.data.items.find((item) => item.sku === sku);
    if (item.quantity_car > 1) {
      const updatedItem = { ...item, quantity_car: item.quantity_car - 1 };
      await dispatch(updateQuantity(updatedItem));
      return updatedItem;
    } else {
      await dispatch(removeCartItem(sku));
      return null;
    }
  }
);

export const updateParams = createAsyncThunk(
  "cart/updateParams",
  async (params, { dispatch, getState }) => {
    const state = getState();
    return { ...state.cart.params, ...params };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    params: {
      type_send: null,
      cep: null,
      cuponDesconto: '',
    },
    data: {
      items: [], 
      cart_total: "0.00",
      cart_total_term: "0.00",
      total_without_offer: "0.00",
      cash: "0.00",
      offer: "0.00",
      quoet_value: null,
      quoets: [],
      chosen_quote: null,
    },
    cartCount: 0,
    status: "idle",
    error: null,
    orderData: {
      quote_type_id: '',
      quote_type: '',
      address_id: '',
      quote_value: '',
      total_value: '',
      purchase_amount: '',
      orderSubtotalValue: '',
      items: []
    }
  },
  reducers: {
    setOrderData(state, action) {
      state.orderData = action.payload;
    },
    clearCart(state) {
      state.data = {
        items: [],
        cart_total: "0.00",
        cart_total_term: "0.00",
        total_without_offer: "0.00",
        cash: "0.00",
        offer: "0.00",
        quoet_value: null,
        quoets: [],
        chosen_quote: null,
      };
      state.cartCount = 0,
      state.params = {
        type_send: null,
        cep: null,
        cuponDesconto: '',
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCartCount.fulfilled, (state, action) => {
        state.cartCount = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.data.items = state.data.items.filter(
          (item) => item.sku !== action.payload
        );
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.data.items = state.data.items.map((item) =>
          item.sku === action.payload.sku ? action.payload : item
        );
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.data.items = action.payload.items;
      })
      .addCase(updateParams.fulfilled, (state, action) => {
        state.params = action.payload;
      });
  },
});

export const { setOrderData, clearCart} = cartSlice.actions;


export default cartSlice.reducer;
