import phoneService from '../services/information'
import axios from 'axios'

const handleDelete = (i) => {
  console.log(i)
  phoneService.remove(i)
}

const Display = ({filterChecker, persons}) => {
  if (filterChecker) {
    const numbers = persons.map(person => person.number)
    return (
      filterChecker.map((name, i) => <div><nobr key={name}>{name} {numbers[i]}</nobr> <button onClick={handleDelete(i)}>delete</button></div>)
      )
  } else {
    return ''
  }

}

export default Display
