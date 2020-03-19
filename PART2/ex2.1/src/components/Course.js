import React from 'react'
// import Reactdom from 'react-dom'
const Header = ({ head }) => {

  return (
    <h1>{head}</h1>
  )
}

const Parts = ({ parts, number, course }) => {
  // let acc = number

  return (
    <div>
      <p>{parts} {number} </p>

    </div>
  )

}

const Course = ({ course }) => {

  const sum = course.parts.reduce((a, i) => { return a + i.exercises }, 0)
  return (
    <div>
      <Header key={course.id} head={course.name} />

      {course.parts.map((c) => <Parts key={c.id} parts={c.name} number={c.exercises} course={course} />)}
      <p>Total of  {sum}</p>
    </div>

  )


}

export default Course