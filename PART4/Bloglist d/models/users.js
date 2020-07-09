const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minlength: 3,
    },
    name: {
        type: String,
        unique: true,
        minlength: 3,
    },
    passwordHash: {
        type: String,
        
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})
userSchema.plugin(uniqueValidator)
userschema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._v
        delete returnedObject._id
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userschema)

modules.exports = User