import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { filterBy } from '../reducers/filterReducer'


const Filter = (props) => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    const input = event.target.value
    // console.log('input from form', input)
    props.filterBy(input)
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

const mapDispatchToProps = {
  filterBy,
}


const ConnectedFilter = connect(
  null,
  mapDispatchToProps,
)(Filter)

export default ConnectedFilter