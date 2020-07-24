import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(  ( {anecdotes, notification} ) => notification)

  const style = message ? {border: 'solid',padding: 10,borderWidth: 1} : {display: 'none'}
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification