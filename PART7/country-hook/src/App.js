import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() =>  {
    axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`).then(
      c => { 
        setCountry(c)
        console.log('from useCountry', c)
      })
  }, [name] )

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  // if (!country.found) {
  //   return (
  //     <div>
  //       not found...
  //     </div>
  //   )
  // }
  console.log('XXXXCountry from country component', country)
  console.log('from Cuontryt', Array.isArray(country))
  console.log('from Country component', country)
  console.log('from Country component', country.name)
  console.log('from Country component', country.population)



  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  console.log('from App component', country)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
{country ? country.data.map( c => <Country country={c} />) : null }
    </div>
  )
}

export default App