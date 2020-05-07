import React from "react";
import Person from './Person'

const Filter = ({filtered, remove}) => {
  return (
    <div>
      {filtered.map((person, i) => (
          <Person key={i} name={person.name} number={person.number} remove={remove} />
        ))}
    </div>
  );
};

export default Filter;
