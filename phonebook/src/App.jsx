import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [filterValue, setFilterValue] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const nameExists = persons.filter((person) => person.name === newName).length != 0

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      const newPersons = persons.concat(newPerson)
      setPersons(newPersons)
      setFilteredPersons(getFilteredPerson(newPersons, filterValue))
      setNewName('')
      setNewNumber('')
    }
  }

  const getFilteredPerson = (personList, value) => {
    return personList.filter((person) => person.name.toLowerCase().includes(value.toLowerCase()))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    const filter = getFilteredPerson(persons, event.target.value)
    setFilterValue(event.target.value)
    setFilteredPersons(filter)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input onChange={handleFilterChange} />
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (<li key={person.name}>{person.name} {person.number}</li>))}
    </div>
  )
}

export default App