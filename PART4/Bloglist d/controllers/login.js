const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router
const User = require('../models/users')


loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({username: body.username})

    const passwordCor   rect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
          error: 'invalid username or password'
        })
      }

    const forToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(useForToken, process.env.SECRET)


    response.status(200)
    .send(200)
    .send(token, username: user.username, name: user.name)

})


module.exports = loginRouter