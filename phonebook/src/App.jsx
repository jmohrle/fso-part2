import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personsService from './services/personsService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsService.getPersons()
      .then((data) => {
        setPersons(data)
      })
  }, [])

  const [filterValue, setFilterValue] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState({ type: null, message: null })

  const filteredPersons = filterValue === ''
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(filterValue.toLowerCase())
    )

  const handleSubmit = (event) => {
    event.preventDefault()

    const person = persons.filter((person) => person.name.toLowerCase() === newName.toLowerCase())

    if (person.length != 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...person[0], number: newNumber }
        personsService
          .updatePerson(updatedPerson)
          .then((data) => {
            setPersons(persons.map(person => person.id === data.id ? data : person))
            setNewName('')
            setNewNumber('')
            setNotification({ type: 'success', message: `Updated number for ${updatedPerson.name}` })
            setTimeout(() => { setNotification({ type: null, message: null }) }, 5000)
          })
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personsService
        .createPerson(newPerson)
        .then((data) => {
          const newPersons = persons.concat(data)
          setPersons(newPersons)
          setNewName('')
          setNewNumber('')
          setNotification({ type: 'success', message: `Added ${newPerson.name}` })
          setTimeout(() => { setNotification({ type: null, message: null }) }, 5000)
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
  const handlePersonDelete = (id, name) => {
    console.log(id, name)
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personsService.deletePerson(id)
        .then(data => {
          const newPersons = persons.filter(person => person.id !== data.id)
          setPersons(newPersons)
        }
        )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      filter show with <Filter onChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} onPersonDelete={handlePersonDelete} />

    </div>
  )
}

export default App