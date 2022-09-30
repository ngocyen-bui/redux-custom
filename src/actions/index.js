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

const editTodo = (id, text) => ({
  type: 'EDIT_TODO',
  id,
  text
})

const completedAll = () => ({
  type: 'COMPLETED_ALL',
})
const clearAllTodo = () => ({ type: 'CLEAR_ALL_TODO' })

const filterAll = () => ({ type: 'ALL' })

export { addTodo, toggleTodo, editTodo, clearAllTodo, completedAll, filterAll }