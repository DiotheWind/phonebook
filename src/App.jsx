import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/backendHandler'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filter, toggleFilter] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    phonebookService
      .getNames()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const handleFilterChange = (e) => {
    setFilterName(e.target.value)
    e.target.value === '' ? toggleFilter(false) : toggleFilter(true)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const addPersonToList = (e) => {
    e.preventDefault()

    const personObj = {
      name: newName,
      number: newNumber,
    }

    if (checkNameDuplicate(personObj)) {
      alert(`${personObj.name} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      phonebookService
        .updateServer(personObj)
        .then(newPersons => {
          setPersons(persons.concat(newPersons))
          setNewName('')
          setNewNumber('')
          showNotification(`${personObj.name} has been added!`)
        })
    }
  }

  const checkNameDuplicate = (personObj) => {
    let isDuplicate = false
    persons.forEach(person => {
      if (person.name.toLowerCase() === personObj.name.toLowerCase()) isDuplicate = true
    })

    return isDuplicate
  }

  const deletePersonFromList = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
      .deleteName(id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id))
      })
    }
  }

  const showNotification = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const namesToShow = filter
  ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  : persons

  return (
    <div>
      <Notification message={notificationMessage} />
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />

      <h2>Add a new number</h2>
      <PersonForm
        addPersonToList={addPersonToList}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={namesToShow} deletePersonFromList={deletePersonFromList} />
    </div>
  )
}

export default App
