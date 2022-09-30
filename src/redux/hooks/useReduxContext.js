import { useContext } from "react"
import { ReduxContext } from "../../context"

export function useReduxContextDefault() {
    const contextValue = useContext(ReduxContext)
    return contextValue
}