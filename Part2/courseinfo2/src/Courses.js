const Courses = ({ courses }) =>
  courses.map((course) => <Course course={course}></Course>);

const Parts = ({ parts }) => parts.map((part) => <Part section={part}></Part>);
const Sum = ({ parts }) => {
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <b>Total of {sum} exercises</b>
    </p>
  );
};
const Part = ({ section }) => (
  <p key={section.id}>
    {section.name} {section.exercises}
  </p>
);
const Content = ({ parts }) => {
  return (
    <>
      <Parts parts={parts}></Parts>
      <Sum parts={parts}></Sum>
    </>
  );
};
const Header = ({ text }) => <h1>{text}</h1>;
const Course = ({ course }) => (
  <>
    <Header text={course.name}></Header>
    <Content parts={course.parts}></Content>
  </>
);

export default Courses;
