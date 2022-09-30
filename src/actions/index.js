let nextTodoId = 0
const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})
const destroyTodo = id => ({
  type: 'DESTROY_TODO',
  id
})
const editTodo = (id, text) => ({
  type: 'EDIT_TODO',
  id,
  text
})

const toggleAll = (checked) => ({
  type: 'TOGGLE_ALL',
  completed: checked
})
const clearCompleted = () => ({ type: 'CLEAR_ALL_COMPLETED' })

const filterTodos = (filter) => ({ type: 'FILTER', filter: filter })

export { addTodo, toggleTodo, editTodo, clearCompleted, toggleAll, filterTodos, destroyTodo }