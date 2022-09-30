const filter = {
  filter: 'ALL',
  filters: {
    ALL: 'ALL',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED'
  }
}

const filterTodo = (state = filter, payload) => {
  switch (payload?.type) {
    case 'SET_VISIBILITY_FILTER':
      return payload.filter
    default:
      return state
  }
}

export default filterTodo
