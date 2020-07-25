import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotif } from '../reducers/notifReducer'
// import anecdoteService from '../services/anecdote'

const AnecdoteForm = ( props ) => {
    const dispatch = useDispatch()
    const create = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(anecdote)
        props.createNotif(anecdote, 6000)
        
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

const mapDispatchToProps = {
  createAnecdote,
  createNotif,
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)


export default ConnectedAnecdoteForm