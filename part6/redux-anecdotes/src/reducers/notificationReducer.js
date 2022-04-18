import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    displayAnecdote(state, action) {
      const content = `Added ${action.payload}`;
      return content;
    },
    displayVote(state, action) {
      const content = `Voted on ${action.payload}`;
      return content;
    },
    clearNotification(state, action) {
      return null;
    },
  },
});

export const { displayVote, displayAnecdote, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
