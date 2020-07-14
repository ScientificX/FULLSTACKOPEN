require('dotenv').config()

let PORT = 3001
let MONGODB_URI = "mongodb+srv://favour:otiger@cluster0-zjkns.mongodb.net/test?retryWrites=true&w=majority"

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = MONGODB_URI = "mongodb+srv://favour:otiger@cluster0-zjkns.mongodb.net/test?retryWrites=true&w=majority"
}

module.exports = {
  MONGODB_URI,
  PORT
}
