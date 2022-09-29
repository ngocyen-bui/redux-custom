


export default function createStore(reducer){  
    if(typeof(reducer) !== 'function'){
        throw new Error('Reducer phải là function')
    }

    let currentReducer = reducer; 
    let currentState = reducer()
    let currentListeners = [];
    let nextListeners = currentListeners  
    function getState(){
        return currentState
    }
    function dispatch(action){  
        currentState = currentReducer(currentState, action) 
        const listeners = (currentListeners = nextListeners)
        for (let i = 0; i < listeners.length; i++) {
          const listener = listeners[i]
          listener()
        }
    
        return action
    }
    function subscribe(listener){
        nextListeners.push(listener)
        return function unsubscribe() {
            const index = nextListeners.indexOf(listener)
            nextListeners.splice(index, 1)
            currentListeners = null
          }
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}