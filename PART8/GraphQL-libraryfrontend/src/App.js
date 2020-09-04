
import React, { useState } from 'react'
import { gql, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notification from './components/Notification'
import Recommend from './components/Recommend'

const App = () => {
    const [page, setPage] = useState('authors')
    const [error, setError] = useState(null)
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    console.log("token from appjs", token)

    const handleLogout = (e) => {
        console.log("handleLogout")
        setToken(null)
        localStorage.clear()
        client.resetStore()
        
    }

    return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
            {!token ?  
             <button onClick={() => setPage("login")} > login </button>
             : <button onClick={() => handleLogout()} > Logout </button>
            }
      </div>
            <button onClick={() => setPage("recommend")} > Recommended Books </button>
            <Notification message={error}/>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
            />

         <Login
         show={page === 'login'}
         setToken={setToken}
         setError={setError}
         /> 
       <Recommend show={page === "recommend"} />
    </div>
  )
}

export default App
