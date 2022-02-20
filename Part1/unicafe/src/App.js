import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Display = (props) => (
  <div>
    {props.name} {props.value}
  </div>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allValues, setAll] = useState([]);

  const increaseValue = (state, stateModifier, buttonName) => {
    let newState = state + 1;
    stateModifier(newState);
    const new_val = buttonName === "good" ? 1 : buttonName === "bad" ? -1 : 0;
    setAll(allValues.concat(new_val));
  };
  const countPositives = (arr) => {
    let positiveCount = 0;
    if (arr.length === 0) {
      return "";
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 1) {
        positiveCount += 1;
      }
    }
    return Math.round((positiveCount / arr.length) * 100) + "%";
  };
  const computeAverage = (arr) => {
    const initialValue = 0;
    const sum = arr.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );
    return sum / arr.length;
  };
  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={() => increaseValue(good, setGood, "good")}
        text="good"
      ></Button>
      <Button
        handleClick={() => increaseValue(neutral, setNeutral, "neutral")}
        text="neutral"
      ></Button>
      <Button
        handleClick={() => increaseValue(bad, setBad, "bad")}
        text="bad"
      ></Button>
      <h1>statistics</h1>
      <Display name="good" value={good}></Display>
      <Display name="neutral" value={neutral}></Display>
      <Display name="bad" value={bad}></Display>
      <Display name="average" value={computeAverage(allValues)}></Display>
      <Display name="positive" value={countPositives(allValues)}></Display>
    </div>
  );
};

export default App;
