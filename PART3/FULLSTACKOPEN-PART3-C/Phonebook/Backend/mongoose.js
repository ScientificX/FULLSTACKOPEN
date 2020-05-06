const mongoose = require("mongoose");

const nameInput = process.argv[2];
const numberInput = process.argv[3];

const url = process.env.MONGODB_URI;
mongoose.connect(
  "mongodb+srv://favour:lavuzela@cluster0-zjkns.mongodb.net/FULLSTACKOPEN?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: nameInput,
  number: numberInput,
});

if (nameInput != undefined && numberInput != undefined) {
  person.save().then((result) => {
    console.log(`lisätään ${nameInput} numero ${numberInput} luetteloon`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name + " " + person.number);
    });
    mongoose.connection.close();
  });
}
