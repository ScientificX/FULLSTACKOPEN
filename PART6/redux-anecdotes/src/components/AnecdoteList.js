import React from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'


const AnecdoteList = ( props ) => {
    
    const anecdotes = () => {

      if ( props.filter === null){
        // console.log('anecdotes from anecdotelist', anecdotes)
        // console.log('filter from anecdotelist', filter)
        // console.log('FILLTERRRNULLL', anecdotes)
        return props.anecdotes
      }

      return props.anecdotes.filter(a => {
        return a.content.toLowerCase().includes(props.filter.toLowerCase() )
      })

    }
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch(voteAction(id, 5000))
    }
    console.log('ANECCCCDOTESSSS', anecdotes)

    return(
        <div>
                  {anecdotes().map(anecdote =>
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


const mapStateToProps = ( state ) => {
  console.log(state)

  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}
 
const ConnectedAnecdote = connect(mapStateToProps)(AnecdoteList)


export default ConnectedAnecdote