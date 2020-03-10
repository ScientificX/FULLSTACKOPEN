import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return(
    <div>
      <p> <Header course={course} /> </p>
      <p> <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} /> </p>
      <p> <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/> </p>
    </div>
  )
}
const Header = (props) => {

  return(
  <div>
    <p> The course is {props.course}</p>
  </div>
  )
}

const Content = (props) => {
  return(
    <div>
      <p> {props.part1} has {props.exercises1} </p>
      <p> {props.part2} has {props.exercises2} </p>
      <p> {props.part3} has {props.exercises3} </p>

    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p> The total number of excercises is {props.exercises1 + props.exercises2 + props.exercises3} </p>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))