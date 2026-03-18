import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personsService from './services/personsService'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsService.getAll()
      .then((data) => {
        setPersons(data)
      })
  }, [])

  const [filterValue, setFilterValue] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const filteredPersons = filterValue === ''
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(filterValue.toLowerCase())
    )

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

      personsService
        .create(newPerson)
        .then((data) => {
          const newPersons = persons.concat(data)
          setPersons(newPersons)
          setNewName('')
          setNewNumber('')

        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} />

    </div>
  )
}

export default App