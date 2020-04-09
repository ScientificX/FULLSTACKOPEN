import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Filter from "./components/Filter";
import axios from "axios";

const App = props => {
  const [person, setPerson] = useState([]);

  const [filter, setFilter] = useState("");
  const [show, setShow] = useState(false)



  const server = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setPerson(response.data);
 
    });
  }

  useEffect(server, []);


  const change0 = event => {
    setFilter(event.target.value);
  };

 

  const filtered = person.filter(persons =>
    persons.name.toUpperCase().includes(`${filter.toUpperCase()}`)
  );



  const lengthCheck = filtered.length;

  const view = () => {
    console.log('the show vutron has been clicked')
    setShow(!show)
  }
  // console.log(show)


  // console.log(view)

  if (lengthCheck > 10) {
    return (
      <div>
        <h1>Countries</h1>
        <Form

          filter={filter}
          change0={change0}

        />
        <p>Too many queries</p>
      </div>
    );
  }
  if (lengthCheck == 0 || lengthCheck <= 10 && lengthCheck > 1 && lengthCheck !== 1) {
    // console.log(filtered.length)
    return (
      <div>
        <h1>Countries</h1>
        <Form

          filter={filter}
          change0={change0}
        />
        <h2>Countries</h2>

        <ul>
          <Filter filtered={filtered}
            show={() => view}
            buttons={show}
          />

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

          filter={filter}
          change0={change0}

        />
        <h2>Countries</h2>
        <Filter filtered={filtered}
          show={view}
          buttons={() => show}
        />
      </div>
    )

  }



};

export default App;
