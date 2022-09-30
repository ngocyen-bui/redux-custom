import { addTodo } from "../actions"
import { useDispatch } from "../redux/hooks/useDispatch" 

export default function Header(){
    const dispatch = useDispatch() 
    const handleAddTodo = (e)=>{
      if(e.keyCode === 13 && e.target.value.trim() !== ""){ 
        dispatch(addTodo(e.target.value))
        e.target.value = ''
      }
    }
    return (
        <header className="header">
				<h1>todos</h1>
				<input className="new-todo" onKeyDown={handleAddTodo} placeholder="What needs to be done?" autoFocus />
		</header>
    )
}