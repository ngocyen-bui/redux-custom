const TODO_STORAGE_KEY = "TODOS" 
 
const storage = {
    get(){
        return localStorage.getItem(TODO_STORAGE_KEY) ? JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)) : []
    },
    set(todos){
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos))
    }
}
export default storage;