export default function createStore(reducer){
    let state = reducer()
    const roots = new Map();

    return {
        dispatch(action, ...args){
            state = reducer(state,action,args)
        },
        connect(selector = state => state){
            return component => (props , ...args ) => 
                component(Object.assign({}, props, selector(state),args));
        },
        attach(component,root){
            roots.push(root,component);
        },
        // useSelector(state){
        //     return state
        // }
    }
}