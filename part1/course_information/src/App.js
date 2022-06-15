function Header(props) {
  return <h1>{props.course}</h1>;
}

function Content(props) {
  return (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
  );
}

function Part(props) {
  return (
    <p>
      {props.part[0]} {props.part[1]}
    </p>
  );
}

function Total(props) {
  let total = props.exercises.reduce((acc, cur) => acc + cur);
  return <p>Number of exercises {total}</p>;
}

function App() {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[
          [part1, exercises1],
          [part2, exercises2],
          [part3, exercises3],
        ]}
      />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  );
}

export default App;
