import { useContext } from "react"
import { ReduxContext } from "../../context"
import { useStore as useDefaultStore } from "./useStore"

export function useReduxContextDefault() {
    const contextValue = useContext(ReduxContext)
    return contextValue
}

   
export function createStoreHook(context = ReduxContext) {
    const useReduxContext = context === ReduxContext ? useReduxContextDefault : () => useContext(context)
    return function useStore() {
        const { store } = useReduxContext()
        return store
    }
}

export function createDispatchHook(context = ReduxContext) {
    const useStore =
        context === ReduxContext ? useDefaultStore : createStoreHook(context)

    return function useDispatch() {
        const store = useStore() 
        return store.dispatch
    }
}
export const useDispatch = createDispatchHook()