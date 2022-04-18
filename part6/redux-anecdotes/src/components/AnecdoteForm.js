import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import {
  displayAnecdote,
  clearNotification,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    event.preventDefault();

    dispatch(createAnecdote(event.target.anecdote.value));
    dispatch(displayAnecdote(event.target.anecdote.value));
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
