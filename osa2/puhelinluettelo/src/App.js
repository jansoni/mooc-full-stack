import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll,setShowAll] = useState(true)
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewPhone(event.target.value)
  }

  const setFilterFunc = (event) => {
    setFilter(event.target.value)
    if (filter.length === 0) {
      setShowAll(false)
    } 
  }

  const addName = (event) => {
    let nameUnique = true
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newPhone,
    }
    persons.forEach(person => {
      if (person.name === nameObject.name) {
        nameUnique = false
      }
    })
    if (nameUnique === true) {
      setPersons(persons.concat(nameObject))
    } else {
      alert(`${newName} is already added to phonebook`)
    }

    setNewName('')
    setNewPhone('')
  }

  const nameToShow = showAll 
    ? persons 
    : persons.filter(person => person.name.match(filter)) 

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>filter shown with<input value={filter} onChange={setFilterFunc}/></div>
      </form>
      <form>
        <h2>add a new</h2>
        <div>name: <input value={newName} onChange={handleNewName}/></div>
        <div>number:<input value={newPhone} onChange={handleNewNumber}/></div>
        <div><button type="submit" onClick={addName}>add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {nameToShow.map(person => 
          <li key={person.name}>{person.name} {person.number}</li>   
        )}
      </ul>
    </div>
  )

}

export default App