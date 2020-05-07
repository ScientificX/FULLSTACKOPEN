const express = require("express");
const app = express();
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://3a5e56a169b04e8581c111a3acf59bf7@o388849.ingest.sentry.io/5226224' });
const morgan = require("morgan");
morgan.token("post", (req, res) => {
  return JSON.stringify(req.body);
});
require('dotenv').config()
app.use(express.json());
const Person = require('./models/persons')
app.use(
  morgan(":method :post :status :res[content-length] - :response-time ms")
);
app.use(Sentry.Handlers.requestHandler());
const cors = require("cors");
app.use(cors());
app.disable('etag');


app.get("/", (req, res) => {
  res.send("<h1>this is backend</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons.map((person) => person.toJSON()));
  });
});



app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id).then(person => {
    if (person) {
      res.json(person.toJSON())
    } else {
      res.status(404).end() 
    }
  })
  .catch(error => {

    res.json({"error": "malformatted id"}).end()
    throw new Error(error);
    
  })
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id
  Person.findByIdAndDelete(id).then( person => {
    res.status(204).end();
  })
  
});


app.post("/api/persons",(req, res) => {
  const body = req.body;
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then( saved => {
    res.json(saved)
  })
})

app.put("/api/persons/:id", (req, res) =>{
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(req.params.id, person, {new: true})
  .then( updatedPerson => {
    res.json(updatedPerson.toJSON())
  })
  .catch( error => {

    res.json({"error": "update error"}).end()
    throw new Error(error)
  } )
} )

app.get('/info', (req, res) =>{
  Person.countDocuments({}).then( number => {
    res.send(`<h1>The number of persons in the database is ${number} on ${new Date()}</h1>`)

  })
});

app.use(Sentry.Handlers.errorHandler());


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});