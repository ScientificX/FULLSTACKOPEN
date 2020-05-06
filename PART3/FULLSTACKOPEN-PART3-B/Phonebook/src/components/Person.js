import React from 'react'

const Note = ({ name, number, remove }) => {
  return (
    <li>{name}  {number}  <button onClick={remove} >delete</button> </li>
  )
}

export default Note