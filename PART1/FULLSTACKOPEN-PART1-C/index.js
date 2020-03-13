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

  return (
    <div>
      {/* <Display head="Give feedback" /> */}
      <h1>Give Feedback</h1>
      <Button onClick={theGood} text="good" />
      <Button onClick={theUgly} text="neutral" />
      <Button onClick={theBad} text="bad" />
      <Display header2="Statistics" good={good} bad={bad} ugly={neutral} />
    </div>
  )
}

const Button = ({onClick, text}) => {

  return (
    <button onClick={onClick} >{text}</button>
  )
}
const Display = ({ header2, good, bad, ugly }) => {

  return (
    <>
      <h2>{header2}</h2>
      <p>Good {good} </p>
      <p>Neutral {ugly} </p>
      <p>Bad {bad} </p>
    </>

  )

}
ReactDOM.render(<App />,
  document.getElementById('root')
)