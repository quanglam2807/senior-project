/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateQuery: (state, action) => {
      const newQuery = action.payload;
      state.query = newQuery;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateQuery } = searchSlice.actions;

export default searchSlice.reducer;
