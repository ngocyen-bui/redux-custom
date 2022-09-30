const todos = (state = [], action) => { 
  switch (action?.type) {
    case 'ADD_TODO':
      return [
        {
          id: action.id,
          text: action.text,
          completed: false
        },
        ...state,
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    case 'EDIT_TODO':
      return state.map(todo =>
        (todo.id === action.id) ? { ...todo, text: action.text }
          : todo)
    case 'CLEAR_ALL_TODO':
      return []
    case 'COMPLETED_ALL':
      return state.map(todo => ({ ...todo, completed: true }))
    default:
      return state
  }
}

export default todos
