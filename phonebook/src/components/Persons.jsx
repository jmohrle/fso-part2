const Persons = ({ filteredPersons, onPersonDelete }) => {

    return (
        filteredPersons.map((person) => (
            <li
                key={person.name}>
                {person.name} {person.number} <button onClick={() => onPersonDelete(person.id, person.name)}>delete</button>
            </li>))
    )

}
export default Persons
