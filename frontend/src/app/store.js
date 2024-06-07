import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import restaurentReducer from '../features/restaurents/restaurentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurents: restaurentReducer
  },
});
