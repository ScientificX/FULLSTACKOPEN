import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Books {
    title
    author
    published
    genres
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born

  }
}
`
export const ALL_BOOKS = gql`
  query {
  allBook { 
    title 
    author
    published 
    genres
  }
}
`

export const ADD_BOOKS = gql`
 mutation ($title: String, $author: String, $published: Int, $genres: [String] ) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author
  }
}
`

export const EDIT_BIRTH  = gql`
mutation ($author: String, $birth: Int){
    changeBirth(
      author: $author,
      birth: $birth
    ){
  	name
    born
  }
  }
`

export const LOGIN = gql`
mutation ($username: String!, $password: String!) {
  login(username: $username, password: $password){
    value 
}
}

`
export const ME = gql`
query{
   me{
     username
     favoriteGenre
}

}
`

export const BOOK_ADDED = gql`
 subscription {
   bookAdded {
    ...BookDetails
}
}
${BOOK_DETAILS}
`
