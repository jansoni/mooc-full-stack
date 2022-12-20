import {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({filter, setFilter}) => {
  const FilterFunc = (event) => {
    setFilter(event.target.value)
  }  
  return ( 
      <form>
        <div>
          filter show with<input value={filter} onChange={FilterFunc}/>
        </div>
      </form>
  )
}

const PersonForm = ({data, setData}) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const NameField = (event) => {
    setName(event.target.value)  
  }
  const NumberField = (event) => {
    setNumber(event.target.value) 
  }
  const addNumber = (event) => {
    let name_reserver = false
    data.forEach(element => {
      if (element.name === name) {
        name_reserver = true
        alert(`${name} is reserved`)
      }
    });
    if (name_reserver === false) {
      event.preventDefault()
      const personObject = {
        name: name,
        number: number,
        id: data.length + 1,
      }
      setData(data.concat(personObject))
    }
  }
  return (
    <form>
      <div>name:<input value={name} onChange={NameField}/></div>
      <div>number:<input value={number} onChange={NumberField}/></div>
      <button onClick={addNumber}>add</button>
    </form>
  )
}

const Persons = ({data, filter}) => {
  if (filter === "") {
    return (
      <div>
        {data.map(element => 
          <p key={element.id}>{element.name} {element.number}</p>  
        )}
      </div>
    )
  } else {
    const filtered = [] 
    data.forEach(element => {
      if (element.name.match(filter)) {
        filtered.push(element)
      }
    });
    return (
      <div>
        {filtered.map(element => 
          <p key={element.id}>{element.name} {element.number}</p>  
        )}
      </div>
    )
  }
}

const App = () => {
  const URL = 'http://localhost:3001/persons'
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  useEffect(() => {
  axios
    .get(URL)
    .then(response => {
      setData(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
      filter={filter} 
      setFilter={setFilter}
      />
      <h3>Add a new</h3>
      <PersonForm 
      data={data}
      setData={setData}
      />
      <h3>Numbers</h3>
      <Persons
      data={data}
      filter={filter}
      />
    </div>
  )
}

export default App