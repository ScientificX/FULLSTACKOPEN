import React from 'react';
import ReactDOM from 'react-dom';



import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
    </div>
  )
}
const Header = (props) => {
  console.log(props);

  return (
    <div>
      <p> The course is {props.course}</p>
    </div>
  )
}

const Content = (props) => {

  return (
    <div>
      <p> {props.part1.name} has {props.part1.exercises} </p>
      <p> {props.part2.name} has {props.part2.exercises} </p>
      <p> {props.part3.name} has {props.part3.exercises} </p>

    </div>
  )
}

const Total = (props) => {
  console.log(props.part1.exercises);
  return (
    <div>
      <p> The total number of excercises is {props.part1.exercises + props.part2.exercises + props.part3.exercises} </p>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))

ReactDOM.render(<App />, document.getElementById('root'));

