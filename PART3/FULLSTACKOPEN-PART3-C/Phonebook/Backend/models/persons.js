const mongoose = require("mongoose")

const url = process.env.MONGODB_URI
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    console.log("connected to mongo")
})
.catch(error => {
    console.log("error connecting", error.message)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,

})

personSchema.set("toJSON",{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)
