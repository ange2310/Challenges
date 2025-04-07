import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0
  },
  reducers: {
    decrement: (state) => {
      state.count -= 1;
    },
    incrementBy: (state, action) => {
      state.count += Number(action.payload);
    }
  }
});

export const { decrement, incrementBy } = counterSlice.actions;
export default counterSlice.reducer;