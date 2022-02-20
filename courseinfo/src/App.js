const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course}></Header>
      <Content
        parts={[part1, part2, part3]}
        exercises={[exercises1, exercises2, exercises3]}
      ></Content>
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      ></Total>
      <p> hello</p>
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={prop.parts[0]} exercise={props.exercises[0]}></Part>
      <Part part={prop.parts[1]} exercise={props.exercises[1]}></Part>
      <Part part={prop.parts[2]} exercise={props.exercises[2]}></Part>
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of Exercises{" "}
      {props.exercises1 + props.exercises2 + props.exercises3}
    </p>
  );
};

export default App;
