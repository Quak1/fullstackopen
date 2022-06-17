import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Title = ({ title }) => <h1>{title}</h1>;

const Info = ({ text, state, tail = "" }) => (
  <div>
    {text} {state} {tail}
  </div>
);

const TableRow = ({ text, state }) => (
  <tr>
    <td>{text}</td>
    <td>{state}</td>
  </tr>
);

const Statistics = ({ statistics }) => {
  const { good, neutral, bad } = statistics;
  if (!good && !neutral && !bad) return <div>No feedback given</div>;

  const info = [];
  for (let key in statistics)
    info.push(<TableRow text={key} state={statistics[key]} />);

  return <table>{info}</table>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseByOne = (state, setState) => () => setState(state + 1);

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = ((good / total) * 100).toString() + " %";

  const statistics = {
    good,
    neutral,
    bad,
    total,
    average,
    positive,
  };

  return (
    <>
      <Title title="give feedback" />
      <Button onClick={increaseByOne(good, setGood)} text="good" />
      <Button onClick={increaseByOne(neutral, setNeutral)} text="neutral" />
      <Button onClick={increaseByOne(bad, setBad)} text="bad" />
      <Title title="statistics" />
      <Statistics statistics={statistics} />
    </>
  );
};

export default App;
