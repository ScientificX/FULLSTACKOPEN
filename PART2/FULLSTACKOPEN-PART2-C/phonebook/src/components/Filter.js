import React from "react";
import Person from './Person'

const Filter = ({ filtered, }) => {
  // console.log(filtered)

  if (filtered.length > 1  || filtered.length === 0) {

    return (
      <div>
        {filtered.map((person, i) => (
          <Person key={i} name={person.name} />
        ))}
      </div>
    );
  }
  if (filtered.length === 1) {
    return (
      <div>

        {filtered.map((person, i) => <Person name={person.name} capital={person.capital} population={person.population} language={person.languages} flag={person.flag} />)}

      </div>

    )

  }
}



export default Filter;
