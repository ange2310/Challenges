import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './Slices/counterSlice';
import stackReducer from './Slices/stackSlice';
export const store = configureStore({
    reducer: {
      counter: counterReducer,
      stack: stackReducer
    },
  });