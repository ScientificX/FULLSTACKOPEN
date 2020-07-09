// import { response } from "express"

const getTokenFrom = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
      return authorization.substring(7)
    }
    next()
    return null
  }

  
module.exports = getTokenFrom