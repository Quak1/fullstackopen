import { useState, useEffect } from 'react'
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
  const baseUrl = "https://restcountries.com/v3.1"
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return undefined
    axios
      .get(`${baseUrl}/name/${name}?fullText=true`)
      .then(res => res.data[0])
      .then(data => setCountry(data))
      .catch(() => setCountry(null))
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div>
      <div>capital {country.capital}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        {/* <input type="text" value={name} onChange={(event) => setName(event.target.value)} /> */}
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
