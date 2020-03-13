import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const theGood = () => {
    setGood(good + 1);
  }
  const theBad = () => {
    setBad(bad + 1)
  }
  const theUgly = () => {
    setNeutral(neutral + 1)
  }
  const all = good + neutral + bad;
  const average = ((1 * good) + (-1 * bad)) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      {/* <Display head="Give feedback" /> */}
      <h1>Give Feedback</h1>
      <Button onClick={theGood} text="good" />
      <Button onClick={theUgly} text="neutral" />
      <Button onClick={theBad} text="bad" />
      <Statistics header2="Statistics" good={good} bad={bad} ugly={neutral} all={all} average={average} positive={positive} />
    </div>
  )
}

const Button = ({ onClick, text }) => {

  return (
    <button onClick={onClick} >{text}</button>
  )
}
const Statistics = ({ header2, good, bad, ugly, all, average, positive }) => {

  return (
    <>
      <h2>{header2}</h2>
      <p>Good {good} </p>
      <p>Neutral {ugly} </p>
      <p>Bad {bad} </p>
      <p>All {all} </p>
      <p>Average {average} </p>
      <p>positive {positive} % </p>
    </>

  )

}
ReactDOM.render(<App />,
  document.getElementById('root')
)