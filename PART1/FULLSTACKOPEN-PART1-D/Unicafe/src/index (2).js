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
  if (good == 0 && neutral == 0 && bad == 0) {

    return (
      <>
        <h1>Give Feedback</h1>
        <Button onClick={theGood} text="good" />
        <Button onClick={theUgly} text="neutral" />
        <Button onClick={theBad} text="bad" />
        <p>No Feedback Given</p>
      </>
    )
  } else {
    return (
      <div>
        {/* <Display head="Give feedback" /> */}
        <h1>Give Feedback</h1>
        <Button onClick={theGood} text="good" />
        <Button onClick={theUgly} text="neutral" />
        <Button onClick={theBad} text="bad" />
        <h2>Statistics</h2>
        <Statistics value={good} text="Good" />
        <Statistics value={neutral} text="Neutral" />
        <Statistics value={bad} text="Bad" />
        <Statistics value={all} text="All" />
        <Statistics value={average} text="Average" />
        <Statistics value={positive} text="Positive" />
      </div>
    )

  }


}

const Button = ({ onClick, text }) => {

  return (
    <button onClick={onClick} >{text}</button>
  )
}
const Statistics = ({ value, text }) => {

  return (
    <>
      <table>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </table>
    </>

  )

}
ReactDOM.render(<App />,
  document.getElementById('root')
)

