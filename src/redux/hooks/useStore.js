import { useContext } from "react" 
import { ReduxContext } from "../../context"
import { useReduxContextDefault } from "./useDispatch"

export function createStoreHook(context = ReduxContext) {
  const useReduxContext = context === ReduxContext ? useReduxContextDefault : () => useContext(context)
  return function useStore() {
    const { store } = useReduxContext()
    return store 
  }
}
 
export const useStore = createStoreHook()