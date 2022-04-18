import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import {
  displayAnecdote,
  clearNotification,
} from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const newAnecdote = await anecdoteService.createNew(
      event.target.anecdote.value
    );
    dispatch(createAnecdote(newAnecdote));
    dispatch(displayAnecdote(newAnecdote.content));
    setTimeout(() => dispatch(clearNotification()), 5000);
    event.target.anecdote.value = '';
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
