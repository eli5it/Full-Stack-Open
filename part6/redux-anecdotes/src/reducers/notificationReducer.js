import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    displayNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return null;
    },
  },
});

const { displayNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(displayNotification(content));
    setTimeout(() => {
      dispatch(clearNotification(content));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
