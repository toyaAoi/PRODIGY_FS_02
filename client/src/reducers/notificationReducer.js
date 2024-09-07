import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: () => {
      return null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

let notificationTimeout = null;

export const createNotification = (type, message) => {
  return (dispatch) => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }

    dispatch(setNotification({ type, message }));
    notificationTimeout = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
