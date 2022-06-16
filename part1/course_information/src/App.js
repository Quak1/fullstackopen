function Header(props) {
  return <h1>{props.course.name}</h1>;
}

function Content(props) {
  return props.parts.map((part) => <Part part={part} />);
}

function Part(props) {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
}

function Total(props) {
  let total = props.parts.reduce((acc, cur) => {
    return acc + cur.exercises;
  }, 0);
  return <p>Number of exercises {total}</p>;
}

function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default App;
