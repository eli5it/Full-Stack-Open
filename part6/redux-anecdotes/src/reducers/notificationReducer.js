import { createSlice } from '@reduxjs/toolkit';
let timerID = null;
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
    clearTimeout(timerID);
    dispatch(displayNotification(content));
    timerID = setTimeout(() => {
      dispatch(clearNotification(content));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
