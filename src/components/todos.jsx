import { useState } from "react";
import { clearAllTodo, editTodo, toggleTodo } from "../actions";
import { useDispatch } from "../redux/hooks/useDispatch";
import { useSelector } from "../redux/hooks/useSelector";

export default function Todos(){
	const [isEdit, setIsEdit] = useState()
	const todos = useSelector(state => state.todos)
	const listFilter = useSelector(state => state.filterTodo)
	const dispatch = useDispatch();
	const handleClearFilter = ()=>{
		dispatch(clearAllTodo())  
	}
	const handleChangeCheckbox = (id)=>{
		dispatch(toggleTodo(id)) 
	} 
	const handleEditTodo = (id, e)=>{ 
		if(e.keyCode === 13){
			dispatch(editTodo(id, e.target.value))
			setIsEdit()
		} 
	}
	const handleActiveEdit = (id)=>{
		setIsEdit(id)
	} 
    return (
      <>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {todos?.map((e) => (
              <li key={e.id} className={`${e.completed &&"completed"} ${isEdit === e.id && "editing"}`}> 
                <div className="view">
                  <div>
                    <input 
                      defaultValue={e.completed}
                      className="toggle"
                      onChange={() => handleChangeCheckbox(e.id)}
                      type="checkbox"
                    />
                    <label onDoubleClick={()=> handleActiveEdit(e.id)} >{e.text}</label>
                    <button className="destroy"></button>
                  </div>
                </div>
                <input className="edit" defaultValue={e.text} onKeyDown={(val) => handleEditTodo(e.id, val)} />
              </li>
            ))} 
          </ul>
        </section>
        <footer className={todos.length > 0 ? "footer":"footer hidden"}>
          <span className="todo-count">
            <strong>0</strong> item left
          </span>
          <ul className="filters">
			  {Object.values(listFilter.filters).map((e,i) => (
					<li key={i}>
						<span  className={e === listFilter.filter ? "selected" : undefined}>
							{e[0] + e.slice(1).toLowerCase()}
						</span>
					</li>
			  ))} 
          </ul>
          <button className="clear-completed" onClick={handleClearFilter}>
            Clear completed
          </button>
        </footer>
      </>
    );
}