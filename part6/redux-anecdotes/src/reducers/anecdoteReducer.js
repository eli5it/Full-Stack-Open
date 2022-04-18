import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    voteOnAnecdote(state, action) {
      const id = action.payload;
      const chosenAnecdote = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...chosenAnecdote,
        votes: chosenAnecdote.votes + 1,
      };
      const unsortedState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
      const sortedState = unsortedState.sort((a, b) => {
        return a.votes - b.votes;
      });
      return sortedState;
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});
export const { voteOnAnecdote, setAnecdotes, addAnecdote } =
  anecdoteSlice.actions;

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
export default anecdoteSlice.reducer;
