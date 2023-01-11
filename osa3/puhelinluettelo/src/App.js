import { useState, useEffect } from 'react'
import Grud from './services/hooks'

const Filter = ({ filter, setFilter}) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        filter shown with <input value={filter} onChange={event => setFilter(event.target.value)} />
      </form>
    </div>
  )
}

const PersonForm = ({ update, setUpdate }) => {
  const [username, setUsername] = useState('')
  const [number, setNumber] = useState('')

  const handleAdd = (event) => {
    if (username != '' && number != '') {
      event.preventDefault()
      const newObject = {
        id: 0,
        name: username,
        number: number,
      }
      Grud.create(newObject)
      setUsername('')
      setNumber('')
      setUpdate(update + 1)
    }
  }

  return (
    <div>
      <h3>Add a new</h3>
      <form>
        name: <input value={username} onChange={event => setUsername(event.target.value)} />
        <br />
        number: <input value={number} onChange={event => setNumber(event.target.value)} />
        <br />
        <button onClick={ handleAdd }>add</button>
      </form>
    </div>
  )
}

const Persons = ({ data, filter, update, setUpdate }) => {

  const remove = (event, person) => {
    event.preventDefault()
    if (window.confirm("Delete?")) {
      Grud.remove(person)
      setUpdate(update + 1)
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
            <button onClick={(event) => remove(event, person.id) }>delete</button>
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
  const [update, setUpdate] = useState(0)

  useEffect(() => {
    Grud.getAll() 
      .then(res => setPersons(res))
    console.log(update, persons);
  }, [update]);


  return (
    <div>
      <Filter
        filter={filter}
        setFilter={setFilter}
      />
      <PersonForm 
        update={update}
        setUpdate={setUpdate}
      />
      <h3>Numbers</h3>
      <Persons
        data={persons}
        filter = {filter}
        update={update}
        setUpdate={setUpdate}
      />
    </div>
  )
}

export default App