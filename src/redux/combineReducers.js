
 // Hàm này dùng để làm gì ?
 // Dùng để kết hợp các Reducer lại với nhau thành 1. và trả về function 
 // Nó trả về hàm combination => nhận vào 2 đối số là state và action 


export default function combineReducers(reducers) {
    // Lấy danh sách Key từ Obj reducer truyền vào 
    const reducerKeys = Object.keys(reducers)
    // const finalReducers: ReducersMapObject = {}
    const finalReducers = {}

    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]
  
      if (typeof reducers[key] === 'function') {
        finalReducers[key] = reducers[key]
      }
    }
    // lấy lại danh sách key mới sau khi check điều kiện value reducer là 1 func 
    const finalReducerKeys = Object.keys(finalReducers)   
    
    return function combination(
      state= {},
      action
    ) { 
      let hasChanged = false
      const nextState = {}
      for (let i = 0; i < finalReducerKeys.length; i++) {
        // Lấy danh sách key của reducers 
        const key = finalReducerKeys[i]
        // Lấy reducer qua key
        const reducer = finalReducers[key]
        // State trước đó 
        const previousStateForKey = state[key] 
        // State sau khi update 
        const nextStateForKey = reducer(previousStateForKey, action) 
        //Cập nhật state
        nextState[key] = nextStateForKey
        // Kiểm tra thay đổi với state cũ thông qua state trước và sau 
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey
      }  
      hasChanged =
        hasChanged || finalReducerKeys.length !== Object.keys(state).length;
      return hasChanged ? nextState : state
    }
  }
  