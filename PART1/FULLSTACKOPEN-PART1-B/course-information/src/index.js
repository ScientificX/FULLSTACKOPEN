import React from 'react';
import ReactDOM from 'react-dom';


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
      <Content part={parts} />
      <Total part={parts}/>
    </div>
  )
}
const Header = (props) => {
  // console.log(props[0]);

  return (
    <div>
      <p> The course is {props.course}</p>
    </div>
  )
}

const Content = (props) => {

  return (
    <div>
      <p> {props.part[0].name} has {props.part[0].exercises} </p>
      <p> {props.part[1].name} has {props.part[1].exercises} </p>
      <p> {props.part[2].name} has {props.part[2].exercises} </p>

    </div>
  )
}

const Total = (props) => {
  console.log(props.exercises);
  return (
    <div>
      <p> The total number of excercises is {props.part[0].exercises + props.part[1].exercises + props.part[2].exercises} </p>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))

ReactDOM.render(<App />, document.getElementById('root'));

