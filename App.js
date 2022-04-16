import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Display from './components/Display'
import Filter from './components/Filter'
import phoneService from './services/information'

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filterChecker, setFilterChecker] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundNameOrNot = persons.some(el => el.name === newName)
    const foundNumberOrNot = persons.some(el => el.number === newNumber)
    const newObj = {
      name: newName,
      number: newNumber,
      id: (Object.keys(persons)).length + 1
    }
    if (foundNameOrNot) {
      alert(`${newName} is already added to phonebook`)
    } else if (foundNumberOrNot) {
      alert(`${newNumber} belongs to someone else`)
    } else {
      phoneService.create(newObj).then(res => setPersons([...persons, newObj]))
    // setPersons([...persons, {name: newName, number: newNumber, id: (Object.keys(persons)).length + 1}])
    }
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
    const allNames = persons.map(person => person.name)
    setFilterChecker(allNames.filter(name => name.toLowerCase().indexOf(filter.toLowerCase()) !== -1))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Display filterChecker={filterChecker} persons={persons} />
    </div>
  )
}

export default App
