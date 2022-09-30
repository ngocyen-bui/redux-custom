import { useState } from "react";
import {
  clearCompleted,
  destroyTodo,
  editTodo,
  filterTodos,
  toggleAll,
  toggleTodo,
} from "../actions";
import { useDispatch } from "../redux/hooks/useDispatch";
import { useSelector } from "../redux/hooks/useSelector";

export default function Todos() {
  const [isEdit, setIsEdit] = useState();
  const data = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };
  const handleChangeCheckbox = (id) => {
    dispatch(toggleTodo(id));
  };
  const handleActiveEdit = (id) => {
    setIsEdit(id);
  };
  const handleFilter = (filter) => {
    if (filter !== data?.filter) {
      dispatch(filterTodos(filter));
    }
  };
  const handleToggleAll = (e) => {
    dispatch(toggleAll(e.target.checked));
  };
  const handleEditTodo = (id, text, e) => { 
     if (e.keyCode === 13) {
      if (e.target.value.trim() === "") {
        return dispatch(destroyTodo(id));
      }
      setIsEdit();
      return dispatch(editTodo(id, e.target.value));
    } else if (e.keyCode === 27) {
      if (e.target.value.trim() === "") {
        return dispatch(destroyTodo(id));
      }
      e.target.value = text;
      setIsEdit();
      return dispatch(editTodo(id, text));
    }
  };
  const handleBlur = (id, e) => {
    if (e.target.value.trim() === "") {
      return dispatch(destroyTodo(id));
    }
    setIsEdit();
    return dispatch(editTodo(id, e.target.value));
  };
  const handleDestroyTodo = (id) => {
    dispatch(destroyTodo(id));
  };
  return (
    <>
      <section className="main">
        <input
          id="toggle-all"
          onClick={handleToggleAll}
          className="toggle-all"
          type="checkbox"
          checked={data?.todos?.length > 0 && data?.todos?.every(data?.filters?.COMPLETED) && true} 
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {data.todos.filter(data?.filters[data?.filter])?.map((e) => (
            <li
              key={e.id}
              className={`${e.completed && "completed"} ${
                isEdit === e.id && "editing"
              }`}
            >
              <div className="view">
                <div>
                  <input
                    checked={e.completed}
                    className="toggle"
                    onChange={() => handleChangeCheckbox(e.id)}
                    type="checkbox"
                  />
                  <label onDoubleClick={() => handleActiveEdit(e.id)}>
                    {e.text}
                  </label>
                  <button
                    className="destroy"
                    onClick={() => handleDestroyTodo(e.id)}
                  ></button>
                </div>
              </div>
              <input
                className="edit"
                autoFocus
                defaultValue={e.text}
                onBlur={(val) => handleBlur(e.id, e.text, val)}
                onKeyDown={(val) => handleEditTodo(e.id, e.text, val)}
              />
            </li>
          ))}
        </ul>
      </section>
      <footer className={data?.todos?.length > 0 ? "footer" : "footer hidden"}>
        <span className="todo-count">
          <strong>{data.todos.filter(data?.filters?.ACTIVE).length}</strong>{" "}
          item left
        </span>
        <ul className="filters">
          {Object.keys(data?.filters).map((e, i) => (
            <li key={i}>
              <span
                onClick={() => handleFilter(e)}
                className={e === data.filter ? "selected" : undefined}
              >
                {e[0] + e.slice(1).toLowerCase()}
              </span>
            </li>
          ))}
        </ul>
        <button className="clear-completed" onClick={handleClearCompleted}>
          Clear completed
        </button>
      </footer>
    </>
  );
}
