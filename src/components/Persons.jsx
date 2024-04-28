import PersonLine from './PersonLine'

const Persons = ({ persons }) => {
    return (
      <div>
        {persons.map(person => <PersonLine key={person.id} name={person.name} number={person.number}/>)}
      </div>
    )
}

export default Persons