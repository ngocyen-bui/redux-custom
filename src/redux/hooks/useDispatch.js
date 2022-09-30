import { ReduxContext } from "../../context"
import { createStoreHook, useStore as useDefaultStore } from "./useStore"


export function createDispatchHook(context = ReduxContext) {
    const useStore =
        context === ReduxContext ? useDefaultStore : createStoreHook(context)

    return function useDispatch() {
        const store = useStore() 
        return store.dispatch
    }
}

export const useDispatch = createDispatchHook()