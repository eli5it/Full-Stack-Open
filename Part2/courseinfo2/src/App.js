import { useState } from "react";
const Part = ({ section }) => (
  <p>
    {section.name} {section.exercises}
  </p>
);
const Content = ({ parts }) => (
  <>
    <Part section={parts[0]}></Part>
    <Part section={parts[1]}></Part>
    <Part section={parts[2]}></Part>
  </>
);

const Header = ({ text }) => <h1>{text}</h1>;
const Course = ({ course }) => (
  <>
    <Header text={course.name}></Header>
    <Content parts={course.parts}></Content>
  </>
);

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};
export default App;
