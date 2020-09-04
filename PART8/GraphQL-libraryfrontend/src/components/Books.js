import React, {useState} from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS } from '../queries.js'
import {BOOK_ADDED} from '../queries.js'
import _ from 'lodash'



const Books = (props) => {
    const [refined, setRefined] = useState([])
    
  const result = useQuery(ALL_BOOKS)
  const client = useApolloClient()
    
    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({subscriptionData}) => {
            console.log("This is from useSubscriptiondata", subscriptionData)
        }
    })

    const updateCacheWith = (addedPerson) => {
        const includedIn = (set, object) => set.map(p => p.id).includes(object.id)

        const dataInStore = client.readQuery({query: ALL_BOOKS})
        if (!includedIn(dataInStore, addedPerson)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: {allBooks: dataInStore.allBooks.concat(addedPerson)}
            })
        }
    }

  if (!props.show) {
    return null
  }
  if (result.loading){
    return (
      <p> loading... </p>
    )
  }
      const books = result.data.allBook
    console.log("refined", refined) 

    const handleGenreChange = (test) => {
        const genre = filtered(test) 
        setRefined(genre)
        return genre
    }

    const filtered = (test) =>{
        const val = books.filter( b => b.genres.includes(test))
        return val
    }

    const genre = books.map(x => x.genres)
    let flattenedGenre = _.uniq( _.flattenDeep(genre))

    
    // console.log("filteredby genre", filtered)
    console.log("Genre obj", genre)
    console.log("Flatten genre obj", flattenedGenre)
    console.log(" books query result", books)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {refined.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
          </table>
          Genres:  {flattenedGenre.map(x =>
                              <button onClick={() => handleGenreChange(x)} > {x} </button>

        )}

    </div>
  )
}

export default Books
