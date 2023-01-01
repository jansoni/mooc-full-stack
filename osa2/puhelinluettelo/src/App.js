import { useState, useEffect } from 'react'
import Grud from './services/hooks'

const Filter = ({ filter, setFilter }) => {
  return (
    <form>
      filter shown with <input value={filter} onChange={event => setFilter(event.target.value)} />
    </form>
  )
}

const PersonForm = ({ data }) => {
  const [username, setUsername] = useState('')
  const [number, setNumber] = useState('')

  const handleAdd = (event) => {
    if (username != '' && number != '') {
      event.preventDefault()
      const newObject = {
        name: username,
        number: number,
        id: (data.length + 1),
      }
      Grud.create(newObject)
    }
  }

  return (
    <form>
      name: <input value={username} onChange={event => setUsername(event.target.value)} />
      <br />
      number: <input value={number} onChange={event => setNumber(event.target.value)} />
      <br />
      <button onClick={(event) => handleAdd(event)}>add</button>
    </form>
  )
}

const Persons = ({ data, filter }) => {

  const remove = (event, person) => {
    event.preventDefault()
    if (window.confirm("Delete?")) {
      Grud.remove(person)
    }
  }

  if (filter != '') {
    const filtered_list = []
    data.forEach(element => {
      if (element.name.match(filter)) {
        filtered_list.push(element)
      }
    });
    return (
      <div>
        {filtered_list.map(person =>
            <p key={person.id}>{person.name} {person.number} 
            <button onClick={(event) => remove(event, person.id)}>delete</button>
            </p>
        )}
      </div>
      )
  } else {
    return (
      <div>
        {data.map(person =>
            <p key={person.id}>{person.name} {person.number} 
            <button onClick={(event) => remove(event, person.id)}>delete</button>
            </p>
        )}
      </div>
    )
  }
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    Grud.getAll()
      .then(res => setPersons(res.data))
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        setFilter={setFilter}
      />
      <h3>Add a new</h3>
      <PersonForm 
        data={persons}
      />
      <h3>Numbers</h3>
      <Persons
        data={persons}
        filter = {filter}
      />
    </div>
  )
}

export default App