import React from "react";

const Person = ({ name, capital, population, language, flag, filtered }) => {
  console.log(filtered)

  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "7px",
    border: "4px",
    width: "150px",
    fontFamily: "Arial"
  };
  if (language) {
    const varFlag = `${flag}`
    return (
      <div>
        <li>{name} </li>
        <p>{capital}</p>
        <p>Population  {population}</p>
        <h4>Languages</h4>
        {language.map( (x, i) => <p key={i}>{x.name}</p>)}
        <p> {<img src={`${varFlag}`}  style={mystyle}   />} </p>
      </div>
    );
  } else {
    return (
      <div>
        <li>{name} </li>
        <p>{capital}</p>
        <p>{population}</p>


      </div>
    );
  }

};

export default Person;
