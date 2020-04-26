import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Header = (props) => <h1>give feedback</h1>;

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistics = ({ good, neutral, bad, average, positive }) => (
  <div>
    <h1>statistics</h1>
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} />
      </tbody>
      
    </table>
  </div>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const computeAverage = (good, neutral, bad) =>
    (good - bad) / (good + bad + neutral);
  const computePositive = (good, neutral, bad) =>
    (good * 100) / (good + bad + neutral);

  const setValue = (value, func) => () => func(value);
  return (
    <div>
      <Header />
      <Button handleClick={setValue(good + 1, setGood)} text="good" />
      <Button handleClick={setValue(neutral + 1, setNeutral)} text="neutral" />
      <Button handleClick={setValue(bad + 1, setBad)} text="bad" />
      <>
        {good + bad + neutral === 0 ? (
          <p>No feedback given</p>
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            positive={computePositive(good, neutral, bad)}
            average={computeAverage(good, neutral, bad)}
          />
        )}
      </>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
