import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import Form from "./components/Form";
import Filter from './components/Filter'
import axios from 'axios'
import personService from './services/persons'

const App = props => {
  const [person, setPerson] = useState([]);


  const [clean, setClean] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(personService.getAll().then(res => setPerson(res.data)),[])
  // console.log(person)



  const form = event => {
    event.preventDefault();

    if (names) {
      alert(`${clean} is already in the phonebook`);
    } else {
      const personObject = {
        name: clean,
        number: number
      };

      personService.create(personObject).then(res => {
        console.log(res.data)
        return setPerson(person.concat(res.data))
      }
        )


    }

    setClean("");
    setNumber("");
  };

  const change1 = event => {
    setClean(event.target.value);
  };
  const change2 = event => {
    setNumber(event.target.value);
  };
  const change0 = event => {
    setFilter(event.target.value);
  };

  const names = person.map(person => person.name).includes(`${clean}`);

  const filtered = person.filter(persons =>
    persons.name.toUpperCase().includes(`${filter.toUpperCase()}`)
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Form
        form={form}
        filter={filter}
        change0={change0}
        change1={change1}
        change2={change2}
        number={number}
        clean={clean}
      />
      <h2>Numbers</h2>

      <ul>
        <Filter filtered={filtered} />
      </ul>
    </div>
  );
};

export default App;