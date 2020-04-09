import React, { useEffect, useState } from "react";
import axios from "axios";
import Country from './Country'

const Filter = ({ filtered, show, buttons}) => {







  

  if (filtered.length > 1  || filtered.length === 0) {

    return (
      <div>
        {filtered.map((country, i) => (
          <Country key={i} name={country.name} />
        ))}
      </div>
    );
  }
  if (filtered.length === 1) {
    return (
      <div>

        {filtered.map((country, i) => <Country key={i} name={country.name} 
        capital={country.capital} population={country.population} language={country.languages}
         flag={country.flag} filtered={filtered} show={show} 
         buttons={buttons}
         />)}

      </div>

    )

  }
}



export default Filter;
