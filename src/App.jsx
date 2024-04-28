import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filter, toggleFilter] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
      // id: persons.length + 1
    }

    if (checkNameDuplicate(personObj)) {
      alert(`${personObj.name} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      axios
        .post('http://localhost:3001/persons', personObj)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
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

  const namesToShow = filter
  ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  : persons

  return (
    <div>
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
      <Persons persons={namesToShow} />
    </div>
  )
}

export default App
