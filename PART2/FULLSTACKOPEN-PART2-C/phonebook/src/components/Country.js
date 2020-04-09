import React, { useEffect, useState } from "react";

import axios from "axios";


const Country = ({ name, capital, population, language, flag, show, buttons }) => {

  const [weather, setWeather] = useState([])

  const point = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_APIK}&query=${capital}`

  const weath = () => {

    axios.get(point).then(
      response => setWeather(response.data)
    )
  }
  useEffect(weath, [])

  // console.log(weather.current)
  const current = weather.current
  const temperature = current ? current.temperature : '';
  const wicon = current ? current.weather_icons.map(x => x) : ''

  console.log(temperature, "then icon url", wicon)

  const mystyle = {

    backgroundColor: "DodgerBlue",
    padding: "7px",
    border: "4px",
    width: "150px",
  };
  if (language || buttons) {
    const varFlag = `${flag}`
    return (
      <div>
        <li>{name} </li>
        <p>{capital}</p>
        <p>Population  {population}</p>
        <h4>Languages</h4>
        {language.map((x, i) => <p key={i}>{x.name}</p>)}
        <p> {<img src={`${varFlag}`} style={mystyle} />} </p>
        <h4>Weather in {capital} </h4>
        <p>The temperature is {temperature} celsius </p>
        <img src={`${wicon}`} />


      </div>
    );
  } else {
    return (
      <div>
        <li>{name} </li>
        <p>{capital}</p>
        <p>{population}</p>
        <button onClick={show} >view</button>

      </div>
    );
  }

};

export default Country;
