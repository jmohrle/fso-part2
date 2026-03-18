const Persons = ({ filteredPersons }) => {

    return (
        filteredPersons.map((person) => (<li key={person.name}>{person.name} {person.number}</li>))
    )

}
export default Persons
