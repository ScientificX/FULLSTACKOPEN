import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })

  
  const Anecdote = () => {setSelected(Math.ceil(1 + (Math.random()) * 100) % 6) }
  const copy = { ...vote };
  copy[selected] += 1
  const voted = () => setVote(copy)
  

  
  let max = 0;

  const filters = Object.entries(vote); 
  
  let index = 0;
  for (const [key, value] of filters ){
    if (value > max ) {
      max = value;
      index = key;
    } 
  }
  

  
  return (

    <div>

      <h2>Anecdote The The Day</h2>
      {anecdotes[selected]} <br></br>
      <button onClick={Anecdote} >next anecdote</button>
      <button onClick={voted}>Vote {vote[selected]}</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[index]}</p>

    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
