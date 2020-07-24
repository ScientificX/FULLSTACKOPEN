import React from 'react'
import { useDispatch } from 'react-redux'
import { filterBy } from '../reducers/filterReducer'


const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    const input = event.target.value
    // console.log('input from form', input)
    dispatch(filterBy(input))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name='notif' onChange={handleChange} />
    </div>
  )
}

export default Filter