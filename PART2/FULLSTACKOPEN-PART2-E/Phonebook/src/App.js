import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import Form from "./components/Form";
import Filter from "./components/Filter";
import axios from "axios";
import personService from "./services/persons";

const App = (props) => {
  const [person, setPerson] = useState([]);

  const [clean, setClean] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  // const [del, setDel] = useState(false)

  useEffect(() => {
    personService.getAll().then((res) => {
      setPerson(res);
    });
  }, []);

  // useEffect(() => {
  //   noteService
  //     .getAll()
  //     .then(initialNotes => {
  //       setNotes(initialNotes)
  //     })
  // }, [])

  const form = (event) => {
    event.preventDefault();

    if (names) {
      if (window.confirm(`${clean} is already in the phonebook, replace?`)) {
        const id = person.find(x => x.name === clean).id
        // console.log(id)
        const personObject1 = {
          name: clean,
          number: number,
        };
        personService.replace(id, personObject1).then( res =>{
          console.log(res)
          // return setPerson(res)
          
        })
        personService.getAll().then( res => setPerson(res))


        console.log(person)
      }

    } else {
      const personObject = {
        name: clean,
        number: number,
      };

      personService.create(personObject).then((res) => {
        // console.log(res)
        return setPerson(person.concat(res));
      });
    }

    setClean("");
    setNumber("");
  };
  const remove = (id) => {
    if (window.confirm("Do you really want to delete?")) {
      personService
        .update(id)
        .then((res) => {
          console.log(res);
          setFilter("");
        })
        .catch((error) => {
          alert(
            `the note '${person
              .filter((x) => x.id === id)
              .map((x) => x.name)}' was already deleted from server`
          );
          setPerson(person.filter((n) => n.id !== id));
        });

        personService.getAll().then(res => setPerson(res))

    }
  };

  // console.log(id)

  const change1 = (event) => {
    setClean(event.target.value);
  };
  const change2 = (event) => {
    setNumber(event.target.value);
  };
  const change0 = (event) => {
    setFilter(event.target.value);
  };

  const names = person.map((person) => person.name).includes(`${clean}`);

  const filtered = person.filter((persons) =>
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
        {filtered.map((person, i) => (
          <Person
            key={i}
            name={person.name}
            number={person.number}
            remove={() => remove(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
