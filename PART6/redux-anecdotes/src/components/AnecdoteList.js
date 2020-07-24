import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
    
    const anecdotes = useSelector( (  {anecdotes, notification, filter } ) => {

      if (filter === null){
        // console.log('anecdotes from anecdotelist', anecdotes)
        // console.log('filter from anecdotelist', filter)
        // console.log('FILLTERRRNULLL', anecdotes)
        return anecdotes
      }

      return anecdotes.filter(a => {
        return a.content.toLowerCase().includes(filter.toLowerCase() )
      })

    })
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch(voteAction(id))
    }
    console.log('ANECCCCDOTESSSS', typeof anecdotes)

    return(
        <div>
                  {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdoteList