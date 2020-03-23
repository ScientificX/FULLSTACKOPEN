import React from "react";
import Person from './Person'

const Filter = ({filtered}) => {
  return (
    <div>
      {filtered.map((person, i) => (
          <Person key={i} name={person.name} number={person.number} />
        ))}
    </div>
  );
};

export default Filter;
