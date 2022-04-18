import { createSlice } from '@reduxjs/toolkit';

const initialMessage = 'sample message';

const notificationReducer = (state = initialMessage, action) => {
  return state;
};

export default notificationReducer;
