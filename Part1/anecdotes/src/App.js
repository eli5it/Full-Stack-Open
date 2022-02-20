import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const getRandomNum = (arr, object) => {
    const randomNum = Math.floor(Math.random() * arr.length);
    setSelected(randomNum);
  };
  const updateVoteCounts = () => {
    let copy = { ...points };
    copy[selected] += 1;
    if (copy[selected] > highestVotes[0]) {
      setHighestVotes([copy[selected], selected]);
    }
    setPointCount(copy);
  };

  const [selected, setSelected] = useState(0);
  const [points, setPointCount] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });
  // highest vote count is stored in first position and location in array in second
  const [highestVotes, setHighestVotes] = useState([0, 0]);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={() => updateVoteCounts()}>vote</button>
      <button onClick={() => getRandomNum(anecdotes, points)}>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[highestVotes[1]]}</div>
    </div>
  );
};

export default App;
