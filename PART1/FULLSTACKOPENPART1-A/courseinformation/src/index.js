import React from 'react'
import ReactDOM from 'react-dom'
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return(
    <div>
      <p> <Header course={course} /> </p>
      <p> <Content part1={part1} part2={part2} part3={part3} exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} /> </p>
      <p> <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/> </p>
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
      <p> {props.part1.name} has {props.exercises1} </p>
      <p> {props.part2.name} has {props.exercises2} </p>
      <p> {props.part3.name} has {props.exercises3} </p>

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