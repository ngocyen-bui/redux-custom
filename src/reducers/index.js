import combineReducers from '../redux/combineReducers'
import todos from './todos'
import filterTodo from './filterTodo'

export default combineReducers({
  todos, 
  filterTodo
})
