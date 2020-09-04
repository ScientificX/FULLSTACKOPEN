const {
    ApolloServer,
    gql,
    UserInputError,
    AuthenticationError
} = require('apollo-server')
const {
    v1: uuid
} = require('uuid')
const mongoose = require('mongoose')
var _ = require('lodash')
const Book = require('./models/Book.js')
const Author = require("./models/Author.js")
const User = require("./models/User.js")
const jwt = require("jsonwebtoken")
const {PubSub} = require('apollo-server')
const pubsub = new PubSub()

const JWT_SECRET = "tokenizerandlexer"

const MONGO_URI = "mongodb+srv://favour:lavuzela@cluster0-zjkns.mongodb.net/apollo?retryWrites=true&w=majority"



mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    x => console.log("Connected to mongodb")
)


let authors = [{
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
        born: 1963
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
]


let books = [{
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

const typeDefs = gql `
  type Mutation {
    addBook(
      title: String
      published: Int
      author: String
      genres: [String]
    ) : Books
    editAuthor(
      name: String!
      setBornTo: Int
    ) : Author
    changeBirth(
      author: String
      birth: Int
    ) : Author
    createUser(
      username: String!
      favoriteGenre: String
      password: String!
    ): User
    login(
     username: String!
     password: String!
    ): Token
  }

type User {
  username: String!
  favoriteGenre: String
  id: ID!
}
type Token {
  value: String!
}

  type Books {
    title: String
    published: Int
    author: String
    id: ID
    genres: [String]
  }
  type Author {
    name: String
    born: Int
    bookCount: Int
  }
  type Author1 {
    name: String
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Books]
    allBook: [Books]
    allAuthors: [Author]
    me: User
    getGenre: [String]
  }
  type Subscription {
    bookAdded: Books
}
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: (root, args) => Author.collection.countDocuments(),
        allBooks: (root, args) => args.author && args.genre ? books.filter(b => b.author === args.author && b.genres.includes(args.genre)) : args.genre ? books.filter(b => b.genres.includes(args.genre)) : books.filter(b => b.author === args.author),
        allBook: () => Book.find({}),
        allAuthors: (root, args) => Author.find({}),
        me: (root, args, {currentUser}) => currentUser
            

    },

    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            // console.log("username from addbook mutation", currentUser.username)
            if (!currentUser){
                throw new AuthenticationError("Invalid Credentials")
            }
            try {
                const author = new Author({...args.author})
                author.save()

                const book = new Book({
                    ...args,
                    author: author._id
                })
                    book.save()
                
            } catch (error) {
                console.log(error)
            }
            pubsub.publish("BOOK_ADDED", {bookAdded: args })
            return args

        },
        changeBirth: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError("Invalid Credentials")
            }
            try {
                console.log(args.birth)
                const oldAuthor = await Author.findOne({
                    name: args.author
                })
                if (!oldAuthor) {
                    console.log("mongoose author", oldAuthor.name)
                    console.log("this is brith", args.born)
                    console.log('oldAuthor is null')
                    return null
                }
                console.log("mongoose author", oldAuthor.name)
                console.log("this is brith", oldAuthor.born)

                oldAuthor.born = args.birth
                await oldAuthor.save()

            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
            return oldAuthor
        },
        createUser: (root, args) => {
            const user = new User({
                ...args
            })
            return user.save()
        },
        login: async (root, args) => {
            console.log("username from login", args.username)
            const user = await User.findOne({
                username: args.username
            })
            console.log("user after finding in mongo", user.username)
            if (!user || args.password != user.password) {
                throw new UserInputError("Wrong credentials")
            }
            const produceToken = {
                username: user.username,
                password: user.password,
                id: user._id,
            }
            return {
                value: jwt.sign(produceToken, JWT_SECRET)
            }
        }

    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
        }
    }

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({
        req
    }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }

    }
})

server.listen().then(({
    url,
    subscriptionsUrl
}) => {
    console.log(`Server ready at ${url}`)
    console.log("Subscriptions ready at ", subscriptionsUrl)
})
