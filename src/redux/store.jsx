import { configureStore } from '@reduxjs/toolkit';
import cvReducer from './slices/cvSlice';

const store = configureStore({
  reducer: {
    cv: cvReducer,
  },
});

export default store;
