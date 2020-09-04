const { ApolloServer, gql } = require('apollo-server')
const { v1 : uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ) : Books
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author

  }

  type Books {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }
  type Author {
    author: String!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Books!]!
    allBook: [Books]
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: (root, args) => {
      var author = books.reduce((acc, curr) => {
        acc[curr.author] = acc[curr.author] === 1 ? acc[curr.author] : (acc[curr.author] || 0) + 1
        return acc;
      } , {})
      var max = Object.values(author).reduce( (acc, curr) => acc + curr )
      return max
    },
    
    allBooks: (root, args) =>  args.author && args.genre ? books.filter( b => b.author === args.author && b.genres.includes(args.genre) ) : args.genre ? books.filter( b => b.genres.includes(args.genre) ) : books.filter( b => b.author === args.author ),
    allBook: () => books,
//fix this shit later
    allAuthors: (root, args) => {
      // var allath = books.reduce( (acc, curr) => {
      // acc[curr.author] = (acc[curr.author] || 0) + 1
      // // console.log(acc)
      // return acc
      // }, {})
      // var good = Object.entries(allath).map(([author, bookCount]) => ({ author, bookCount }))
     
      return authors
    }
  },

  Mutation: {
    addBook: (root, args) => {
      var book = {...args, id: uuid() }
      books = books.concat(book)
      return book
    },

    editAuthor: (root, args) => {
      var author = authors.find( a => a.name === args.name)
      var changedAuthor = {...author, born: args.setBornTo}
      authors.map( a => a.author === args.name ? changedAuthor : a )
      console.log(author)
      console.log(args.name)
      console.log(changedAuthor)
      return author ? changedAuthor : null ;
    }   
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
