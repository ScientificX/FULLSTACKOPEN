const express = require("express");
const app = express();
const morgan = require("morgan");
morgan.token("post", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(express.static('build'))
app.use(
  morgan(":method :post :status :res[content-length] - :response-time ms")
);
const cors = require("cors");

app.use(cors());
app.disable('etag');
let persons = [
  {
    id: 1,
    name: "HTML is eaxvsy",
    number: "2020-01-10T17:30:31.098Z",
  },
  {
    id: 3,
    name: "HTML is eavsy",
    number: "2020-01-10T17:30:31.098Z",
  },
  {
    id: 23,
    name: "HTML is eazcsy",
    number: "2020-01-10T17:30:31.098Z",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/person", (req, res) => {
  res.json(persons);
});

const generateId = () => {
  const maxId = Math.floor(Math.random() * 10000000);
  return maxId;
};

app.post("/api/person", (request, response) => {
  const body = request.body;

  const boole = persons
    .map((x) => {
      
      return x.name;
    })
    .includes(`${body.name}`);

  // console.log(body)
  console.log(boole);

  if (!body.name) {
    return response.status(400).json({
      error: "cant accept empty",
    });
  }
  if (boole) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId()
  };

  persons = persons.concat(person);

  response.json(person);
});

app.get("/api/person/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log('get request',request.body)
  const person = persons.find((person) => person.id === id);
  
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/person/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
})

app.get("/info", (req, res) => {
  const number = persons.length;
  const info = `Phonebook has ${number} people in it and The date is ${new Date()}`;
  res.send(info);
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
