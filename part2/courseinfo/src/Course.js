const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part) => <Part key={part.id} part={part} />);

const Total = ({ parts }) => {
  const sum = parts.reduce((acc, cur) => acc + cur.exercises, 0);

  return <strong>Number of {sum} exercises</strong>;
};

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

export default Course;
