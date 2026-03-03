import { useState } from "react";

// Button component (Task 1.10)
const Button = (props) => {
  console.log("Button props:", props);
  return <button onClick={props.onClick}>{props.text}</button>;
};

// StatisticLine component (Task 1.10)
const StatisticLine = (props) => {
  console.log("StatisticLine props:", props);
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

// Statistics component (Tasks 1.8 - 1.11)
const Statistics = (props) => {
  console.log("Statistics props:", props);

  const { good, neutral, bad } = props;

  // Calculate statistics
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positive = total === 0 ? 0 : (good / total) * 100;

  // Task 1.9: Conditional rendering - only show if feedback given
  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  // Task 1.11: Display as HTML table with key props
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine key="good" text="good" value={good} />
          <StatisticLine key="neutral" text="neutral" value={neutral} />
          <StatisticLine key="bad" text="bad" value={bad} />
          <StatisticLine key="all" text="all" value={total} />
          <StatisticLine key="average" text="average" value={average} />
          <StatisticLine
            key="positive"
            text="positive"
            value={positive + " %"}
          />
        </tbody>
      </table>
    </div>
  );
};

// Main App component
const App = () => {
  // Task 1.6: State for feedback counters
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Event handlers
  const handleGood = () => {
    console.log("Good button clicked");
    setGood(good + 1);
  };

  const handleNeutral = () => {
    console.log("Neutral button clicked");
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    console.log("Bad button clicked");
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>

      {/* Feedback buttons (Task 1.6) */}
      <div>
        <Button onClick={handleGood} text="good" />
        <Button onClick={handleNeutral} text="neutral" />
        <Button onClick={handleBad} text="bad" />
      </div>

      {/* Statistics component (Tasks 1.7-1.11) */}
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
