const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },

    favouriteGenre: {
        type: String
    }

})

module.exports = mongoose.model("User", schema)
