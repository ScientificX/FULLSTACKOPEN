import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const create = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.value = ''
        dispatch(createAnecdote(anecdote))
      }
    
      return(
        <div>
        <h2>create new</h2>
        <form onSubmit={create} >
          <div><input name='anecdote' /></div>
          <button type='submit' >create</button>
        </form>
      </div>
      )

}

export default AnecdoteForm