require('dotenv').config()
const express = require("express");
const Person = require("./models/persons");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
morgan.token("data", (req, res) => {
  return JSON.stringify(req.body);
});

const log = () =>
  morgan(":method :url :status :res[content-length] :response-time :data");
// app.use(log());

app.get("/", (req, res) => {
  res.send("<h1>this is backend</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons.map((person) => person.toJSON()));
  });
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook has info for ${persons.length} people </p> ${date}`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});


app.post("/api/persons", log(), (req, res) => {
  const body = req.body;
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  if (
    body.name === "" ||
    body.name == undefined ||
    body.number === "" ||
    body.number === undefined
  ) {
    res.status(400).json({
      error: "name or number missing",
    });
  } else if (
    Person.find({}).then(persons => {
      persons.find(p => p.name.toLowerCase() === person.name.toLowerCase())
    })
  ) {
    res.status(400).json({
      error: "name must be unique",
    });
  } else {
    person.save().then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});