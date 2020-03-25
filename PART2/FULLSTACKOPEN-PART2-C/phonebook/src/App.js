import React, { useState, useEffect } from "react";
// import Person from "./components/Person";
import Form from "./components/Form";
import Filter from "./components/Filter";
import axios from "axios";

const App = props => {
  const [person, setPerson] = useState([]);
  const [clean, setClean] = useState("");
  const [filter, setFilter] = useState("");

  const server = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setPerson(response.data);
      // console.log(response.data)
    });
  };

  useEffect(server, []);

  const form = event => {
    event.preventDefault();

    if (names) {
      alert(`${clean} is already in the phonebook`);
    }
    setClean("");
  };

  const change1 = event => {
    setClean(event.target.value);
  };

  const change0 = event => {
    setFilter(event.target.value);
  };

  const names = person.map(person => person.name).includes(`${clean}`);

  const filtered = person.filter(persons =>
    persons.name.toUpperCase().includes(`${filter.toUpperCase()}`)
  );

  const lengthCheck = filtered.length;

  if (lengthCheck > 10) {
    return (
      <div>
        <h1>Countries</h1>
        <Form
          form={form}
          filter={filter}
          change0={change0}
          change1={change1}
          clean={clean}
        />
        <p>Too many queries</p>
      </div>
    );
  }
  if ( lengthCheck == 0 || lengthCheck < 10 && lengthCheck > 1 && lengthCheck !== 1 ) {
    console.log(filtered.length)
    return (
      <div>
        <h1>Countries</h1>
        <Form
          form={form}
          filter={filter}
          change0={change0}
        />
        <h2>Countries</h2>

        <ul>
          <Filter filtered={filtered} />
        </ul>
      </div>
    );
  }

  if (lengthCheck === 1) {



    // console.log(34563457673456546346)
    return (
      <div>
        <h1>Countries</h1>
        <Form
          form={form}
          filter={filter}
          change0={change0}
          change1={change1}
          clean={clean}
        />
        <h2>Countries</h2>
        <Filter filtered={filtered} />
      </div>
    )

  }


};

export default App;
