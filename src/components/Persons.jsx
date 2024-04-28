import PersonLine from './PersonLine'

const Persons = ({ persons, deletePersonFromList }) => {
    return (
      <div>
        {persons.map(person => <PersonLine key={person.id} name={person.name} number={person.number} handleDeletion={() => deletePersonFromList(person.name, person.id)}/>)}
      </div>
    )
}

export default Persons
