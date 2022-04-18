import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
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
export const { createAnecdote, voteOnAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
