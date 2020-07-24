import React from 'react'
import  { useEffect } from 'react'
import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'



const App = () => {

  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(initializeAnecdotes())
  }, [dispatch] )

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
   </div>
  )
}

export default App