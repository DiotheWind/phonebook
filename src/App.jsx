import { useState } from 'react'

const DisplayNamesAndNumbers = ({ name, number }) => <p>{name} {number}</p>

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '09655706535'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filter, toggleFilter] = useState(false)

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
      number: newNumber
    }

    if (checkNameDuplicate(personObj)) {
      alert(`${personObj.name} is alreadly added to the phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
    }
  }

  const checkNameDuplicate = (name) => {
    let isDuplicate = false
    persons.forEach(person => {
      if (JSON.stringify(person) === JSON.stringify(name)) isDuplicate = true
    })

    return isDuplicate
  }

  const namesToShow = filter
  ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <p>filter shown with <input value={filterName} onChange={handleFilterChange} /></p>
      <form onSubmit={addPersonToList}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {namesToShow.map(person => <DisplayNamesAndNumbers key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

export default App
