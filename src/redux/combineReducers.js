
 

export default function combineReducers(reducers) {
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
    //   const nextState: StateFromReducersMapObject<typeof reducers> = {}
      const nextState = {}
      for (let i = 0; i < finalReducerKeys.length; i++) {
        const key = finalReducerKeys[i]
        const reducer = finalReducers[key]
        const previousStateForKey = state[key]
        const nextStateForKey = reducer(previousStateForKey, action)
        if (typeof nextStateForKey === 'undefined') {
          const actionType = action && action.type
          throw new Error(
            `When called with an action of type ${
              actionType ? `"${String(actionType)}"` : '(unknown type)'
            }, the slice reducer for key "${key}" returned undefined. ` +
              `To ignore an action, you must explicitly return the previous state. ` +
              `If you want this reducer to hold no value, you can return null instead of undefined.`
          )
        }
        nextState[key] = nextStateForKey
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey
      }
      hasChanged =
        hasChanged || finalReducerKeys.length !== Object.keys(state).length
      return hasChanged ? nextState : state
    }
  }
  