/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addItem: (state, action) => {
      // item id of the good, different from cart item id
      const menuItemId = action.payload;
      state.items = [...state.items, { id: uuidv4(), menuItemId }];
    },
    removeItem: (state, action) => {
      const cartItemId = action.payload;
      state.items = state.items.filter((item) => item.id === cartItemId);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
