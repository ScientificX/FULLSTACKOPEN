  
import React, {useState} from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTH } from '../queries.js'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [value, setValue] = useState("")
  const [birth, setBirth] = useState("")

  const [ changeBirth ] = useMutation(EDIT_BIRTH)
  
  if (!props.show) {
    return null
  }
  if (result.loading){
    return (
      <p>loading...</p>
    )
  }
  
  const handleBirthChange = (e) => {
    e.preventDefault()
    changeBirth({
      variables: { author: value, birth: Number(birth) }
    })
      console.log(value,"author",birth, "birth")
  }
  
  const authors = result.data.allAuthors
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
            <td>{a.name}</td>
            <td>{a.born}</td>
            <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

  <form onSubmit={handleBirthChange} >
  
    <label> 
      Select author for edit:
      <select onChange={({target}) => setValue(target.value)} value={value} >
        {authors.map( a => 
          <option value={a.name} > {a.name} </option>
          
        )}
      </select>
    </label>
    <input 
      value={birth}
      onChange={({target}) => setBirth(target.value)}
      type="number"
    />
    <button type="submit"> Submit </button>
  </form>


    </div>
  )
}

export default Authors
