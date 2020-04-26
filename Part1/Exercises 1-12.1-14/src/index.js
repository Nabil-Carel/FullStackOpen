import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Display = ({ quoteInfo, title }) => (
  <div>
    <h1>{title}</h1>

    <p>{quoteInfo.quote}</p>
    <p>{`has ${quoteInfo.votes} votes`}</p>
  </div>
);

const App = () => {
  const anecdotes = [
    { quote: "If it hurts, do it more often", votes: 0 },
    {
      quote: "Adding manpower to a late software project makes it later!",
      votes: 0,
    },
    {
      quote:
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0,
    },
    {
      quote:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      votes: 0,
    },
    { quote: "Premature optimization is the root of all evil.", votes: 0 },
    {
      quote:
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      votes: 0,
    },
  ];
  const [selected, setSelected] = useState(0);
  const [quotes, setQuotes] = useState(anecdotes);
  const [mostVotes, setMostVotes] = useState(0);

  const nextAnecdote = (size) => () => {
    const val = Math.round(Math.random() * (size - 1));
    setSelected(val);
  };

  const vote = (index) => () => {
    const newArray = [...quotes];
    quotes[index].votes += 1;
    setQuotes(newArray);
    const max = newArray
      .map((elem) => elem.votes)
      .reduce((a, b) => Math.max(a, b));

    const maxIndex = newArray.findIndex((elem) => elem.votes === max);
    setMostVotes(maxIndex);
  };

  return (
    <div>
      <Display quoteInfo={quotes[selected]} title="Anecdote of the day" />
      <Button text="vote" handleClick={vote(selected)} />
      <Button text="next anecdote" handleClick={nextAnecdote(quotes.length)} />
      <Display quoteInfo={quotes[mostVotes]} title="Anecdote with most votes" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
