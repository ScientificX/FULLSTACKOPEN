const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
mongoose.set("useFindAndModify", false);
mongoose.set('useCreateIndex', true);

const url = process.env.MONGODB_URI;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to mongo");
  })
  .catch((error) => {
    console.log("error connecting", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: Number,
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
