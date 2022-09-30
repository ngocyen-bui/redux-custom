import storage from "../utils/storage";

const initState = {
  todos: storage.get(),
  filter: "ALL",
  filters: {
    ALL: () => true,
    ACTIVE: (todos) => !todos.completed,
    COMPLETED: (todos) => todos.completed,
  },
};

const todos = (state = initState, action) => {
  let result = state
  switch (action?.type) {
    case "ADD_TODO":
      result =  {
        ...state,
        todos: [
          {
            id: action.id,
            text: action.text,
            completed: false,
          },
          ...state.todos,
        ],
      };
      break;
    case "TOGGLE_TODO":
      result =  {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
      break
    case "EDIT_TODO":
      result = {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, text: action.text } : todo
        ),
      };
      break;
    case "CLEAR_ALL_COMPLETED": 
    result = {
        ...state,
        todos: state.todos.filter(state.filters.ACTIVE),
      };
      break
    case "TOGGLE_ALL":
      result = {
        ...state,
        todos: state.todos.map((todo) => ({
          ...todo,
          completed: action.completed,
        })),
      };
      break;
    case "FILTER":
      result = {
        ...state,
        filter: action.filter,
      };
      break;
    case "DESTROY_TODO":
      result = {
        ...state,
        todos: state.todos.filter(e => e.id !== action.id),
      };
      break;
    default:
      result = state;
  }
  storage.set(result.todos)
  return result
};

export default todos;
