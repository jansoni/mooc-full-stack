import { useState, useEffect} from "react";

const Search = ({ data }) => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleInput = (event) => {
    setFilter(event.target.value)
    setCountries([])
    data.forEach(country => {
      if (country.name.common.match(filter))  {
        setCountries((oldArray) => [...oldArray, country.name.common])
      } 
    })
   }
   if (countries.length === 1) {
      return (
        <div>
          <form>
            <div>find countries<input value={filter} onChange={handleInput}/></div>
          </form>
          <Country data={data} filter={filter}/>
        </div>
      ) 
   } else {
      return (
      <div>
        <form>
          <div>find countries<input value={filter} onChange={handleInput}/></div>
        </form>
        <ul>
          {countries.map(country =>
              <li key={country}> {country} <button>show</button></li>
          )}
        </ul>
      </div>
    )
   }
}

const Country = (props) => {
  const info = []
  props.data.forEach(country => {
    if (country.name.common.match(props.filter)) {
      info.push(country)
    }
  })
  console.log(info)

  return (
    <div>
      <h1>{info[0].name.common}</h1>
      <br/>
      <p>capital {info[0].capital[0]}</p>
      <p>area {info[0].area}</p>
      <br/>
      <strong>languages:</strong>
      <br/>
      <img src={info[0].flags.png}/>
    </div>
  )
}

const Weather = ({ data }) => {

}



function App() {
  const url = 'https://restcountries.com/v3.1/all'
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      <Search data={data}/>
    </div>
  );
}

export default App;
