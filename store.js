import { configureStore } from '@reduxjs/toolkit';
import authReducer from './providerSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
