
 

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
    const finalReducerKeys = Object.keys(finalReducers)   
    return function combination(
      state= {},
      action
    ) { 
      let hasChanged = false
      const nextState = {}
      for (let i = 0; i < finalReducerKeys.length; i++) {
        // Lấy key 
        const key = finalReducerKeys[i]
        // Lấy reducer qua key
        const reducer = finalReducers[key]
        const previousStateForKey = state[key] 
        const nextStateForKey = reducer(previousStateForKey, action)

        nextState[key] = nextStateForKey
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey
      }
      hasChanged =
        hasChanged || finalReducerKeys.length !== Object.keys(state).length;
      return hasChanged ? nextState : state
    }
  }
  