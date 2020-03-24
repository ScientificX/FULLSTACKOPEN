import React from "react";

const Person = ({ name, capital, population, language, flag }) => {
  console.log(language)
  
  return (
    <div>
      <li>{name} </li>
      <p>{capital}</p>
      <p>{population}</p>
      <p>{language.map( x => x.name )}</p> 
      <p>{flag}</p>
      
    </div>
  );
};

export default Person;
