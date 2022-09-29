
const initState = {
    todos: []
}

const actions =  {
    add(state){

    }
}

export default function reducer(state = initState, action, args){
    actions[action] && actions[action](state, ...args)
    return state
}