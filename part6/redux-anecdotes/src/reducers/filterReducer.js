import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter(state, action) {
      return action.payload.toLowerCase();
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;
