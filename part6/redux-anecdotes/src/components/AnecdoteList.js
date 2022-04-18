import { voteOnAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';
const AnecdoteList = (props) => {
  const vote = (id, content) => {
    props.voteOnAnecdote(id);
    props.setNotification(`voted on ${content}`, 5);
  };
  return (
    <div>
      {props.anecdotes.map((anecdote) => (
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

const mapStateToProps = (state) => {
  let anecdotes = state.anecdotes;
  const filter = state.filter;
  if (filter) {
    anecdotes = anecdotes.filter(
      (anecdote) =>
        anecdote.content.slice(0, filter.length).toUpperCase() ===
        filter.toUpperCase()
    );
  }
  const sortedAnecdotes = [...anecdotes].sort((a, b) => {
    return a.votes - b.votes;
  });
  return { anecdotes: sortedAnecdotes };
};

const mapDispatchToProps = {
  voteOnAnecdote,
  setNotification,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;
