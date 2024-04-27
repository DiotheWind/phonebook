import { useState } from 'react'

const Filter = ({ filterName, handleFilterChange }) => <p>filter shown with <input value={filterName} onChange={handleFilterChange} /></p>

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPersonToList}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => <PersonLine key={person.id} name={person.name} number={person.number}/>)}
    </div>
  )
}

const PersonLine = ({ name, number }) => <p>{name} {number}</p>

const App = () => {
  const [persons, setPersons] = useState([])
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
      number: newNumber,
      id: persons.length + 1
    }

    if (checkNameDuplicate(personObj)) {
      alert(`${personObj.name} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
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
