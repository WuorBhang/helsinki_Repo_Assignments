import { useState } from "react";

// Button component (reusable)
const Button = (props) => {
  console.log("Button props:", props);
  return <button onClick={props.onClick}>{props.text}</button>;
};

// Main App component
const App = () => {
  // Task 1.12: Anecdotes array
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  // Task 1.12: State for selected anecdote index
  const [selected, setSelected] = useState(0);

  // Task 1.13: State for votes (array initialized to zeros)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  console.log("Current state - selected:", selected, "votes:", votes);

  // Task 1.12: Handler for random anecdote
  const handleRandom = () => {
    console.log("Random button clicked");
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  // Task 1.13: Handler for voting (immutable update!)
  const handleVote = () => {
    console.log("Vote button clicked for anecdote", selected);
    // Create a copy of the votes array (immutability!)
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  // Task 1.14: Find anecdote with most votes
  const maxVotesIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the day</h1>

      {/* Task 1.12: Display selected anecdote */}
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      {/* Task 1.13: Vote and Random buttons */}
      <div>
        <Button onClick={handleVote} text="vote" />
        <Button onClick={handleRandom} text="next anecdote" />
      </div>

      {/* Task 1.14: Display anecdote with most votes */}
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[maxVotesIndex]}</p>
      <p>has {votes[maxVotesIndex]} votes</p>
    </div>
  );
};

export default App;
