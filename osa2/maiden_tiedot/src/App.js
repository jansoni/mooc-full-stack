import { useState, useEffect} from "react";

const Filter = ({filter, setFilter}) => {
  const FilterFunc = (event) => {
    setFilter(event.target.value)
  }  
  return ( 
    <form>
      <div>
        find countries <input value={filter} onChange={FilterFunc}/>
      </div>
    </form>
  )
}

const Countries = (props) => {
  if (props.data != null) {
    const filteredCountries = []
    props.data.forEach(country => {
      if (country.name.common.match(props.filter)) {
        filteredCountries.push(country)
      }
    })
    if (filteredCountries.length > 0 && filteredCountries.length < 11 && 
      filteredCountries.length !== 1) {
      return (
        <div>
          {filteredCountries.map(country => 
          <p key={country.name.common}>{country.name.common}<button>show</button></p>
          )}
        </div>
      )
    } else if (filteredCountries.length === 1) {
      return (
        <Country data={filteredCountries}/>
      )
    } else {
      return (
        <p>Too many matches</p>
      )
    }
  }
}

const Country = ({ data }) => {
  const languages = [] 
  Object.values(data[0].languages).forEach(val =>
    languages.push(val)
  )

  return (
    <div>
      <h1>{data[0].name.common}</h1>
      <p>capital {data[0].capital}</p>
      <p>area {data[0].area}</p>
      <br/>
      <strong>languages</strong>
      {languages.map(language => 
        <p key={language}>{language}</p> 
     )}
     <img src={data[0].flags.png}/>
     <Weather/>
    </div>
  )
}

const Weather = () => {

}

const Button = () => {

}

function App() {
  const url = 'https://restcountries.com/v3.1/all'
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then((usefulData) => {
        setLoading(false)
        setData(usefulData)
      })
      .catch((e) => {
        console.error(`Error ${e}`)
      })
  }, [])

  return (
    <div>
      <Filter
      filter={filter} 
      setFilter={setFilter}
      />
      <Countries
      filter={filter}
      data={data}
      />
    </div>
  );
}

export default App;
