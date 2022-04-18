import { compose, createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});
export const { setAnecdotes, addAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(newAnecdote));
  };
};
export const voteOnAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const anecdotes = state.anecdotes;
    const changedAnecdote = await anecdoteService.updateVoteCount(id);
    const newState = anecdotes.map((anecdote) =>
      anecdote.id !== id ? anecdote : changedAnecdote
    );
    dispatch(setAnecdotes(newState));
  };
};

export default anecdoteSlice.reducer;
