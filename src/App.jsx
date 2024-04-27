import { useState } from 'react'

const Numbers = ({ name }) => <p>{name}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleInputChange = (e) => {
    setNewName(e.target.value)
  }

  const addPersonToList = (e) => {
    e.preventDefault()
    const personObj = {
      name: newName
    }

    if (checkNameDuplicate(personObj)) {
      alert(`${personObj.name} is alreadly added to the phonebook`)
      setNewName('')
    } else {
      setPersons(persons.concat(personObj))
      setNewName('')
    }
  }

  const checkNameDuplicate = (name) => {
    let isDuplicate = false
    persons.forEach(person => {
      if (JSON.stringify(person) === JSON.stringify(name)) isDuplicate = true
    })

    return isDuplicate
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersonToList}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(person => <Numbers key={person.name} name={person.name} />)}
    </div>
  )
}

export default App
