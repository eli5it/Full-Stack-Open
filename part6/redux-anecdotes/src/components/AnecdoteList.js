import { useDispatch, useSelector } from 'react-redux';
import { voteOnAnecdote } from '../reducers/anecdoteReducer';
import {
  displayVote,
  clearNotification,
} from '../reducers/notificationReducer';
const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const vote = (id, content) => {
    dispatch(voteOnAnecdote(id));
    dispatch(displayVote(content));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
