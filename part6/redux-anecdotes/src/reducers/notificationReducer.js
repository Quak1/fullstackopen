import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    changeNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return null;
    },
  },
});

export const setNotification =
  (content, seconds = 5) =>
  async (dispatch, getState) => {
    dispatch(changeNotification(content));
    const timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
    clearTimeout(timeoutId - 1);
  };

export const { changeNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
