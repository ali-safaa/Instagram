import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const providerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { logIn, logOut } = providerSlice.actions;
export const selectUser = (state) => state.auth.user;

export default providerSlice.reducer;
