import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
   name: 'search',
   initialState: {
      query: '',
      isOpened: false,
   },
   reducers: {
      setSearchOpened: (state, action) => {
         state.isOpened = action.payload;
      },
      setSearchQuery: (state, action) => {
         state.query = action.payload;
      },
   },
});

export const { setSearchQuery, setSearchOpened } = searchSlice.actions;

export default searchSlice.reducer;
