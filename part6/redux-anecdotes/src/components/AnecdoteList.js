import { useDispatch, useSelector } from 'react-redux';
import { voteOnAnecdote } from '../reducers/anecdoteReducer';
import {
  displayVote,
  clearNotification,
} from '../reducers/notificationReducer';
const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter) {
      return anecdotes.filter(
        (anecdote) =>
          anecdote.content.slice(0, filter.length).toUpperCase() ===
          filter.toUpperCase()
      );
    }
    return anecdotes;
  });
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
